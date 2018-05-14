from nltk.stem.snowball import SnowballStemmer


def Processing(sentence):
    stemmer = SnowballStemmer("english")
    prev_words = sentence.split(' ')
    words = [stemmer.stem(word) for word in prev_words]

    sentence = ' '.join(words)
    return sentence
