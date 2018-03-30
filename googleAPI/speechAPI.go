// Sample speech-quickstart uses the Google Cloud Speech API to transcribe
// audio.
package googleApi

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strconv"
	// Imports the Google Cloud Speech API client package.
	"golang.org/x/net/context"

	speech "cloud.google.com/go/speech/apiv1"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
)

func check(e error) {
	if e != nil {
		log.Fatal(e)
		panic(e)
	}
}
func CreateDirIfNotExist(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err = os.MkdirAll(dir, 0755)
		if err != nil {
			panic(err)
		}
	}
}
func SpeechAPI() {
	fmt.Println("====Start shell Script====")
	cmdStr := "./shell/convertVoiveFile.sh"
	cmd := exec.Command("bash", cmdStr)
	_, err := cmd.Output()
	if err != nil {
		log.Println(err.Error())
		return
	}
	fmt.Println("====Create Client====")
	ctx := context.Background()

	// Creates a client.
	client, err := speech.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	fmt.Println("====Search Audio File====")
	i := 1
	for {
		var pathFile string
		pathFile = "./audioFile_python/test" + strconv.Itoa(i) + ".flac"

		fmt.Println(pathFile)
		if _, err := os.Stat(pathFile); err == nil {
			// Reads the audio file into memory.
			data, err := ioutil.ReadFile(pathFile)
			if err != nil {
				log.Fatalf("Failed to read file: %v", err)
			}
			// Detects speech in the audio file.
			resp, err := client.Recognize(ctx, &speechpb.RecognizeRequest{
				Config: &speechpb.RecognitionConfig{
					Encoding:        speechpb.RecognitionConfig_FLAC,
					SampleRateHertz: 16000,
					LanguageCode:    "en-US",
				},
				Audio: &speechpb.RecognitionAudio{
					AudioSource: &speechpb.RecognitionAudio_Content{Content: data},
				},
			})
			if err != nil {
				log.Fatalf("failed to recognize: %v", err)
			}
			// Prints the results.
			fmt.Printf("Response" + strconv.Itoa(i) + "\nresult.txt file create\n")
			createFile := "./resultText/result" + strconv.Itoa(i) + ".txt"
			CreateDirIfNotExist("./resultText")
			f, err := os.Create(createFile)
			check(err)
			defer f.Close()
			w := bufio.NewWriter(f)
			for _, result := range resp.Results {
				for _, alt := range result.Alternatives {
					w.WriteString(alt.Transcript + "\n")
					// fmt.Printf("\"%v\" (confidence=%3f)\n", , alt.Confidence)
				}
				w.Flush()
			}
			fmt.Println("     Clear " + strconv.Itoa(i))
			i++
		} else {
			fmt.Println("No File" + strconv.Itoa(i))
			break
		}
	}
	// Sets the name of the audio file to transcribe.
	// filename := "/Users/jinhyuk/go/src/github.com/JinHyukParkk/CapstoneProject/audioFile/res.flac"
}
