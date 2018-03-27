from nltk.stem.porter import *

def Processing(sentence):
    stemmer = PorterStemmer()
    prev_words = sentence.split(' ')
    words = [stemmer.stem(word) for word in prev_words]

    sentence = ' '.join(words)
    return sentence
