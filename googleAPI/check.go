// Sample speech-quickstart uses the Google Cloud Speech API to transcribe
// audio.
package googleApi

import (
	"log"
	// Imports the Google Cloud Speech API client package.
)

func check(e error) {
	if e != nil {
		log.Fatal(e)
		panic(e)
	}
}
