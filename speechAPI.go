// Sample speech-quickstart uses the Google Cloud Speech API to transcribe
// audio.
package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	// Imports the Google Cloud Speech API client package.
	"golang.org/x/net/context"

	speech "cloud.google.com/go/speech/apiv1"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func main() {
	ctx := context.Background()

	// Creates a client.
	client, err := speech.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Sets the name of the audio file to transcribe.
	filename := "/Users/jinhyuk/go/src/github.com/JinHyukParkk/CapstoneProject/audioFile/res.flac"

	// Reads the audio file into memory.
	data, err := ioutil.ReadFile(filename)
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
	fmt.Printf("Response\nresult.txt file create\n")
	f, err := os.Create("/Users/jinhyuk/go/src/github.com/JinHyukParkk/CapstoneProject/text/result.txt")
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
}
