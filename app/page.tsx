"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftRight, Copy, Delete, Space, BookOpen, Users, MessageCircle } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Guttin alphabet mapping
const guttinAlphabet = [
  { letter: "A", symbol: "ʘ" },
  { letter: "B", symbol: "ꓐ" },
  { letter: "C", symbol: "ᐭ" },
  { letter: "D", symbol: "∂" },
  { letter: "E", symbol: "Σ" },
  { letter: "F", symbol: "ƒ" },
  { letter: "G", symbol: "Ϭ" },
  { letter: "H", symbol: "║" },
  { letter: "I", symbol: "ı" },
  { letter: "J", symbol: "ʖ" },
  { letter: "K", symbol: "⋉" },
  { letter: "L", symbol: "⎸" },
  { letter: "M", symbol: "ϻ" },
  { letter: "N", symbol: "ﬡ" },
  { letter: "O", symbol: "○" },
  { letter: "P", symbol: "Ϸ" },
  { letter: "Q", symbol: "Ϙ" },
  { letter: "R", symbol: "Я" },
  { letter: "S", symbol: "Ϟ" },
  { letter: "T", symbol: "┬" },
  { letter: "U", symbol: "∪" },
  { letter: "V", symbol: "√" },
  { letter: "W", symbol: "ω" },
  { letter: "X", symbol: "☓" },
  { letter: "Y", symbol: "Ү" },
  { letter: "Z", symbol: "ʒ" },
]

const guttinDictionary = {
  // Pronouns
  i: { romanized: "mi", symbols: "ϻı" },
  you: { romanized: "tu", symbols: "┬∪" },
  he: { romanized: "ha", symbols: "║ʘ" },
  she: { romanized: "ha", symbols: "║ʘ" },
  it: { romanized: "ha", symbols: "║ʘ" },
  we: { romanized: "nu", symbols: "ﬡ∪" },
  they: { romanized: "su", symbols: "Ϟ∪" },

  // Greetings
  hello: { romanized: "ka", symbols: "⋉ʘ" },
  goodbye: { romanized: "zi", symbols: "ʒı" },
  yes: { romanized: "lo", symbols: "⎸○" },
  no: { romanized: "na", symbols: "ﬡʘ" },
  please: { romanized: "do", symbols: "∂○" },
  "thank you": { romanized: "ra tu", symbols: "Яʘ ┬∪" },
  sorry: { romanized: "su ra", symbols: "Ϟ∪ Яʘ" },

  // Common phrases
  "how are you": { romanized: "ke tu mo", symbols: "⋉Σ ┬∪ ϻ○" },
  "i am fine": { romanized: "mi mo", symbols: "ϻı ϻ○" },
  "what is your name": { romanized: "ke tu noma", symbols: "⋉Σ ┬∪ ○ﬡϻʘ" },
  "my name is": { romanized: "mi noma", symbols: "ϻı ○ﬡϻʘ" },
  "nice to meet you": { romanized: "mo la tu", symbols: "ϻ○ ⎸ʘ ┬∪" },

  // Numbers
  one: { romanized: "una", symbols: "∪ﬡʘ" },
  two: { romanized: "dua", symbols: "∂∪ʘ" },
  three: { romanized: "tre", symbols: "┬ЯΣ" },
  four: { romanized: "fura", symbols: "ƒ∪Яʘ" },
  five: { romanized: "fiva", symbols: "ƒı√ʘ" },
  six: { romanized: "ses", symbols: "ϞΣϞ" },
  seven: { romanized: "set", symbols: "ϞΣ┬" },
  eight: { romanized: "oko", symbols: "○⋉○" },
  nine: { romanized: "nuen", symbols: "ﬡ∪Σﬡ" },
  ten: { romanized: "des", symbols: "∂ΣϞ" },

  // Family
  father: { romanized: "pata", symbols: "Ϸʘ┬ʘ" },
  mother: { romanized: "mata", symbols: "ϻʘ┬ʘ" },
  brother: { romanized: "brota", symbols: "ꓐЯ○┬ʘ" },
  sister: { romanized: "sista", symbols: "ϞıϞ┬ʘ" },
  friend: { romanized: "la", symbols: "⎸ʘ" },
  child: { romanized: "cilu", symbols: "ᐭı⎸∪" },

  // Food & Drink
  food: { romanized: "nura", symbols: "ﬡ∪Яʘ" },
  water: { romanized: "ua", symbols: "∪ʘ" },
  bread: { romanized: "bro", symbols: "ꓐЯ○" },
  rice: { romanized: "risi", symbols: "ЯıϞı" },
  meat: { romanized: "mia", symbols: "ϻıʘ" },
  drink: { romanized: "do ua", symbols: "∂○ ∪ʘ" },

  // Places
  house: { romanized: "husa", symbols: "║∪Ϟʘ" },
  city: { romanized: "cita", symbols: "ᐭı┬ʘ" },
  road: { romanized: "roda", symbols: "Я○∂ʘ" },
  school: { romanized: "scola", symbols: "Ϟᐭ○⎸ʘ" },
  market: { romanized: "marka", symbols: "ϻʘЯ⋉ʘ" },

  // Verbs
  be: { romanized: "es", symbols: "ΣϞ" },
  have: { romanized: "ha", symbols: "║ʘ" },
  go: { romanized: "ga", symbols: "Ϭʘ" },
  come: { romanized: "koma", symbols: "⋉○ϻʘ" },
  see: { romanized: "si", symbols: "Ϟı" },
  eat: { romanized: "doa", symbols: "∂○ʘ" },
  drink: { romanized: "dua", symbols: "∂∪ʘ" },
  know: { romanized: "noa", symbols: "ﬡ○ʘ" },
  good: { romanized: "mo", symbols: "ϻ○" },
  like: { romanized: "amo", symbols: "ʘϻ○" },
  want: { romanized: "doa", symbols: "∂○ʘ" },
  understand: { romanized: "si", symbols: "Ϟı" },
  speak: { romanized: "spek", symbols: "ϞϷΣ⋉" },
}

function romanizedToSymbols(romanized: string): string {
  return romanized
    .split("")
    .map((char) => {
      const found = guttinAlphabet.find((item) => item.letter.toLowerCase() === char.toLowerCase())
      return found ? found.symbol : char
    })
    .join("")
}

function GuttinTranslator() {
  const [englishText, setEnglishText] = useState("")
  const [guttinRomanized, setGuttinRomanized] = useState("")
  const [guttinSymbols, setGuttinSymbols] = useState("")
  const [translationDirection, setTranslationDirection] = useState<"en-to-guttin" | "guttin-to-en">("en-to-guttin")

  const translateText = (text: string, direction: "en-to-guttin" | "guttin-to-en") => {
    if (!text.trim()) {
      setGuttinRomanized("")
      setGuttinSymbols("")
      return
    }

    const lowerText = text.toLowerCase().trim()

    if (direction === "en-to-guttin") {
      // Try to find exact phrase match first
      if (guttinDictionary[lowerText as keyof typeof guttinDictionary]) {
        const translation = guttinDictionary[lowerText as keyof typeof guttinDictionary]
        setGuttinRomanized(translation.romanized)
        setGuttinSymbols(translation.symbols)
        return
      }

      // Try word by word translation
      const words = lowerText.split(" ")
      const translatedWords = words.map((word) => {
        const translation = guttinDictionary[word as keyof typeof guttinDictionary]
        return translation ? translation.romanized : word
      })

      const romanized = translatedWords.join(" ")
      setGuttinRomanized(romanized)
      setGuttinSymbols(romanizedToSymbols(romanized))
    }
  }

  const handleEnglishChange = (value: string) => {
    setEnglishText(value)
    if (translationDirection === "en-to-guttin") {
      translateText(value, "en-to-guttin")
    }
  }

  const swapLanguages = () => {
    const newDirection = translationDirection === "en-to-guttin" ? "guttin-to-en" : "en-to-guttin"
    setTranslationDirection(newDirection)

    // Clear all fields when swapping
    setEnglishText("")
    setGuttinRomanized("")
    setGuttinSymbols("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section id="translator" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Guttin Translator</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Translate between English and Guttin using our growing dictionary of words and phrases.
          </p>
        </div>

        <Card className="p-6 border-2">
          <div className="space-y-6">
            {/* Language Direction Toggle */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 bg-secondary/20 rounded-lg p-2">
                <span
                  className={`px-3 py-1 rounded ${translationDirection === "en-to-guttin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  English
                </span>
                <Button variant="ghost" size="sm" onClick={swapLanguages} className="p-2">
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
                <span
                  className={`px-3 py-1 rounded ${translationDirection === "guttin-to-en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  Guttin
                </span>
              </div>
            </div>

            {/* Translation Interface */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* English Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">English</label>
                </div>
                <Textarea
                  placeholder="Enter English text to translate..."
                  value={englishText}
                  onChange={(e) => handleEnglishChange(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Guttin Output */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Guttin</label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(guttinSymbols)}
                      disabled={!guttinSymbols}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Romanized Version */}
                <div className="bg-muted/50 rounded-md p-3 min-h-[60px] border">
                  <div className="text-sm text-muted-foreground mb-1">Romanized:</div>
                  <div className="font-mono text-foreground">
                    {guttinRomanized || "Translation will appear here..."}
                  </div>
                </div>

                {/* Symbols Version */}
                <div className="bg-muted/50 rounded-md p-3 min-h-[60px] border">
                  <div className="text-sm text-muted-foreground mb-1">Symbols:</div>
                  <div className="font-mono text-2xl text-primary leading-relaxed break-words overflow-hidden">
                    {guttinSymbols || "ϻıϞ┬Σ Яı○∪Ϟ Ϟıϻꓐ○⎸Ϟ..."}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Phrases */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Phrases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["hello", "how are you", "thank you", "goodbye", "i am fine", "nice to meet you"].map((phrase) => (
                  <Button
                    key={phrase}
                    variant="outline"
                    className="justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => handleEnglishChange(phrase)}
                  >
                    <div>
                      <div className="font-medium capitalize">{phrase}</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {guttinDictionary[phrase as keyof typeof guttinDictionary]?.symbols}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Dictionary Preview */}
        <Card className="mt-8 p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl font-mono text-primary">∂ıᐭ┬</span>
              Dictionary Preview
            </CardTitle>
            <CardDescription>Browse some of the words available in our Guttin dictionary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(guttinDictionary)
                .slice(0, 12)
                .map(([english, guttin]) => (
                  <div key={english} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground capitalize">{english}</div>
                      <div className="text-sm text-muted-foreground">{guttin.romanized}</div>
                    </div>
                    <div className="text-xl font-mono text-primary">{guttin.symbols}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function GuttinKeyboard() {
  const [typedText, setTypedText] = useState("")
  const [showRomanized, setShowRomanized] = useState(true)

  const getSymbolForLetter = (letter: string): string => {
    const found = guttinAlphabet.find((item) => item.letter === letter.toUpperCase())
    return found ? found.symbol : letter
  }

  const addSymbol = (symbol: string) => {
    setTypedText((prev) => prev + symbol)
  }

  const addSpace = () => {
    setTypedText((prev) => prev + " ")
  }

  const backspace = () => {
    setTypedText((prev) => prev.slice(0, -1))
  }

  const clearText = () => {
    setTypedText("")
  }

  const copyText = () => {
    navigator.clipboard.writeText(typedText)
  }

  const addCommonPhrase = (phrase: string) => {
    if (typedText && !typedText.endsWith(" ")) {
      setTypedText((prev) => prev + " " + phrase)
    } else {
      setTypedText((prev) => prev + phrase)
    }
  }

  return (
    <section id="keyboard" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Guttin Virtual Keyboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Type in Guttin using our virtual keyboard. Click on the symbols to compose text in the ancient script.
          </p>
        </div>

        <Card className="p-6 border-2">
          <div className="space-y-6">
            {/* Text Display Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Your Guttin Text</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowRomanized(!showRomanized)}>
                    {showRomanized ? "Hide" : "Show"} Romanized
                  </Button>
                  <Button variant="ghost" size="sm" onClick={copyText} disabled={!typedText}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearText} disabled={!typedText}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-4 min-h-[100px] border">
                <div className="font-mono text-3xl text-primary leading-relaxed break-words overflow-hidden">
                  {typedText || "┬ıϷΣ ║ΣЯΣ..."}
                </div>
                {showRomanized && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Romanized:</div>
                    <div className="font-mono text-foreground overflow-hidden">
                      {typedText
                        .split("")
                        .map((char) => {
                          if (char === " ") return " "
                          const found = guttinAlphabet.find((item) => item.symbol === char)
                          return found ? found.letter.toLowerCase() : char
                        })
                        .join("") || "type here..."}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Virtual Keyboard */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Virtual Keyboard</h3>

              {/* Keyboard Rows */}
              <div className="space-y-2">
                {[
                  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                  ["Z", "X", "C", "V", "B", "N", "M"],
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1">
                    {row.map((letter) => {
                      const symbol = getSymbolForLetter(letter)
                      return (
                        <Button
                          key={letter}
                          variant="outline"
                          className="h-12 w-12 p-0 font-mono text-lg hover:bg-primary/10 hover:border-primary/30 transition-all bg-transparent"
                          onClick={() => addSymbol(symbol)}
                        >
                          <div className="flex flex-col items-center">
                            <div className="text-primary text-xl leading-none">{symbol}</div>
                            <div className="text-xs text-muted-foreground leading-none">{letter}</div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                ))}

                {/* Space and Control Keys */}
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="h-12 px-6 hover:bg-primary/10 hover:border-primary/30 bg-transparent"
                    onClick={backspace}
                  >
                    <Delete className="h-4 w-4 mr-2" />
                    Backspace
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 px-12 hover:bg-primary/10 hover:border-primary/30 bg-transparent"
                    onClick={addSpace}
                  >
                    <Space className="h-4 w-4 mr-2" />
                    Space
                  </Button>
                </div>
              </div>
            </div>

            {/* Common Phrases Shortcuts */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Phrases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { english: "hello", symbols: "⋉ʘ" },
                  { english: "goodbye", symbols: "ʒı" },
                  { english: "thank you", symbols: "Яʘ ┬∪" },
                  { english: "yes", symbols: "⎸○" },
                  { english: "no", symbols: "ﬡʘ" },
                  { english: "please", symbols: "∂○" },
                  { english: "i am fine", symbols: "ϻı ϻ○" },
                  { english: "how are you", symbols: "⋉Σ ┬∪ ϻ○" },
                  { english: "nice to meet you", symbols: "ϻ○ ⎸ʘ ┬∪" },
                ].map((phrase) => (
                  <Button
                    key={phrase.english}
                    variant="outline"
                    className="justify-start text-left h-auto p-3 hover:bg-primary/5 hover:border-primary/30 bg-transparent"
                    onClick={() => addCommonPhrase(phrase.symbols)}
                  >
                    <div className="w-full">
                      <div className="font-mono text-primary text-lg">{phrase.symbols}</div>
                      <div className="text-sm text-muted-foreground capitalize">{phrase.english}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Keyboard Tips */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Keyboard Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Symbol Layout</h4>
                  <p className="text-sm text-muted-foreground">
                    The keyboard follows the QWERTY layout with Guttin symbols mapped to their corresponding English
                    letters.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Quick Input</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the quick phrase buttons to insert common expressions, or build words letter by letter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function AlphabetShowcase() {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null)

  return (
    <section id="alphabet" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">The Guttin Alphabet</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the 26 mystical symbols that form the foundation of the Guttin writing system. Each symbol carries
            ancient meaning and otherworldly power.
          </p>
        </div>

        {/* Alphabet Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-12">
          {guttinAlphabet.map(({ letter, symbol }) => (
            <Card
              key={letter}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/30"
              onMouseEnter={() => setHoveredLetter(letter)}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <CardContent className="p-6 text-center overflow-hidden">
                <div className="space-y-3">
                  <div className="text-4xl font-mono text-primary group-hover:text-accent transition-colors duration-300">
                    {symbol}
                  </div>
                  <div className="text-lg font-semibold text-foreground">{letter}</div>
                  <div className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {letter} → {symbol}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Display */}
        <Card className="p-8 bg-card border-2">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Interactive Symbol Display</CardTitle>
            <CardDescription>
              Hover over letters above to see them highlighted, or click on any symbol to learn more
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hoveredLetter ? (
              <div className="text-center space-y-4">
                <div className="text-8xl font-mono text-primary">
                  {guttinAlphabet.find((item) => item.letter === hoveredLetter)?.symbol}
                </div>
                <div className="text-2xl font-bold text-foreground">Letter: {hoveredLetter}</div>
                <div className="text-lg text-muted-foreground">
                  Symbol: {guttinAlphabet.find((item) => item.letter === hoveredLetter)?.symbol}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-8">
                <div className="text-6xl font-mono text-muted-foreground/50">ʘꓐᐭ∂Σ</div>
                <div className="text-lg text-muted-foreground">
                  Hover over any letter above to see it displayed here
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alphabet Facts */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl font-mono text-primary">ʘꓐᐭ</span>
                Symbol Origins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Each Guttin symbol draws inspiration from ancient geometric forms and mystical patterns. The symbols are
                designed to be both visually striking and functionally distinct for clear communication.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl font-mono text-primary">∂Σƒ</span>
                Writing Direction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Guttin is written from left to right, similar to English. The symbols can be written in both uppercase
                and lowercase forms, though the distinction is primarily stylistic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function GuttinIntroduction() {
  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "examples">("overview")

  const grammarExamples = [
    {
      title: "Basic Word Order (SVO)",
      english: "I eat food",
      romanized: "mi doa nura",
      symbols: "ϻı ∂○ʘ ﬡ∪Яʘ",
      explanation: "Subject (I) + Verb (eat) + Object (food)",
    },
    {
      title: "Negation with 'na'",
      english: "I do not eat food",
      romanized: "mi na doa nura",
      symbols: "ϻı ﬡʘ ∂○ʘ ﬡ∪Яʘ",
      explanation: "Add 'na' before the verb to negate",
    },
    {
      title: "Questions with 'ke'",
      english: "Are you good?",
      romanized: "ke tu mo?",
      symbols: "⋉Σ ┬∪ ϻ○?",
      explanation: "Start with 'ke' to form questions",
    },
    {
      title: "Plurals with '-im'",
      english: "friends",
      romanized: "laim",
      symbols: "⎸ʘıϻ",
      explanation: "Add '-im' to make nouns plural",
    },
    {
      title: "Past Tense with '-et'",
      english: "I ate",
      romanized: "mi doaet",
      symbols: "ϻı ∂○ʘΣ┬",
      explanation: "Add '-et' suffix for past tense",
    },
    {
      title: "Future with 'su'",
      english: "I will eat",
      romanized: "mi su doa",
      symbols: "ϻı Ϟ∪ ∂○ʘ",
      explanation: "Add 'su' before verb for future tense",
    },
  ]

  return (
    <section id="introduction" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Learn Guttin</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Master the ancient language of Guttin through comprehensive lessons on grammar, structure, and usage.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-secondary/20 rounded-lg p-1">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              onClick={() => setActiveTab("overview")}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "grammar" ? "default" : "ghost"}
              onClick={() => setActiveTab("grammar")}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Grammar
            </Button>
            <Button
              variant={activeTab === "examples" ? "default" : "ghost"}
              onClick={() => setActiveTab("examples")}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Examples
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-primary">Ϭ∪┬┬ʘﬡ</span>
                  About the Guttin Language
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Guttin is a constructed language that blends ancient mysticism with modern linguistic principles.
                    Born from otherworldly inspiration, it features a unique writing system of 26 symbols that
                    correspond to the English alphabet, each carrying deep symbolic meaning.
                  </p>
                  <p>
                    The language follows familiar grammatical patterns while maintaining its own distinct character.
                    With Subject-Verb-Object word order similar to English, Guttin is accessible to learners while
                    offering the intrigue of an entirely new symbolic system.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 26 unique mystical symbols</li>
                      <li>• SVO word order (like English)</li>
                      <li>• Simple tense system</li>
                      <li>• Logical negation and questions</li>
                      <li>• Growing vocabulary of 200+ words</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Learning Path</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Start with the alphabet symbols</li>
                      <li>• Learn basic vocabulary</li>
                      <li>• Practice simple sentences</li>
                      <li>• Master grammar rules</li>
                      <li>• Build conversational skills</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl font-mono text-primary">ϻıϞ┬ıᐭ</span>
                    Mystical Origins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each symbol in Guttin draws from ancient geometric patterns and otherworldly designs, creating a
                    writing system that feels both familiar and alien.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl font-mono text-primary">⎸○Ϭıᐭ</span>
                    Logical Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Despite its mystical appearance, Guttin follows clear grammatical rules that make it learnable and
                    practical for communication.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl font-mono text-primary">Σ√○⎸∪┬</span>
                    Ever-Growing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guttin is a living language, continuously expanding its vocabulary and refining its grammar as more
                    speakers join the community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "grammar" && (
          <div className="space-y-6">
            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle>Essential Grammar Rules</CardTitle>
                <CardDescription>Master these fundamental patterns to speak Guttin fluently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {grammarExamples.map((example, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">{example.title}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">English:</span>
                          <span className="text-foreground">{example.english}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Romanized:</span>
                          <span className="font-mono text-foreground">{example.romanized}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Guttin:</span>
                          <span className="font-mono text-2xl text-primary">{example.symbols}</span>
                        </div>
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-sm text-muted-foreground italic">{example.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Tense System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Present Tense</h4>
                    <p className="text-sm text-muted-foreground">No marker needed</p>
                    <div className="font-mono text-primary">ϻı ∂○ʘ</div>
                    <div className="text-sm text-muted-foreground">mi doa (I eat)</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Past Tense</h4>
                    <p className="text-sm text-muted-foreground">Add -et suffix</p>
                    <div className="font-mono text-primary">ϻı ∂○ʘΣ┬</div>
                    <div className="text-sm text-muted-foreground">mi doaet (I ate)</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Future Tense</h4>
                    <p className="text-sm text-muted-foreground">Add su before verb</p>
                    <div className="font-mono text-primary">ϻı Ϟ∪ ∂○ʘ</div>
                    <div className="text-sm text-muted-foreground">mi su doa (I will eat)</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Word Formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Plurals</h4>
                    <p className="text-sm text-muted-foreground">Add -im suffix</p>
                    <div className="font-mono text-primary">⎸ʘ → ⎸ʘıϻ</div>
                    <div className="text-sm text-muted-foreground">la → laim (friend → friends)</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Questions</h4>
                    <p className="text-sm text-muted-foreground">Start with ke</p>
                    <div className="font-mono text-primary">⋉Σ ┬∪ ○ﬡϻʘ?</div>
                    <div className="text-sm text-muted-foreground">ke tu noma?</div>
                    <div className="text-foreground">What is your name?</div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Negation</h4>
                    <p className="text-sm text-muted-foreground">Add na before verb</p>
                    <div className="font-mono text-primary">ϻı ﬡʘ ∂○ʘ</div>
                    <div className="text-sm text-muted-foreground">mi na doa (I do not eat)</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-6">
            <Card className="p-6 border-2">
              <CardHeader>
                <CardTitle>Common Conversations</CardTitle>
                <CardDescription>Practice with these everyday dialogues in Guttin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Meeting Someone New</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">⋉ʘ! ⋉Σ ┬∪ ϻ○?</div>
                        <div className="text-sm text-muted-foreground">ka! ke tu noma?</div>
                        <div className="text-foreground">Hello! What is your name?</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">ϻı ○ﬡϻʘ ʘﬡﬡʘ. ⋉Σ ┬∪ ϻ○?</div>
                        <div className="text-sm text-muted-foreground">mi noma anna. ke tu noma?</div>
                        <div className="text-foreground">My name is Anna. What is your name?</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">ϻı ○ﬡϻʘ ϻʘЯ⋉. ϻ○ ⎸ʘ ┬∪!</div>
                        <div className="text-sm text-muted-foreground">mi noma mark. mo la tu!</div>
                        <div className="text-foreground">My name is Mark. Nice to meet you!</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Daily Check-in</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">⋉Σ ┬∪ ϻ○?</div>
                        <div className="text-sm text-muted-foreground">ke tu mo?</div>
                        <div className="text-foreground">How are you?</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">ϻı ϻ○. Яʘ ┬∪!</div>
                        <div className="text-sm text-muted-foreground">mi mo. ra tu!</div>
                        <div className="text-foreground">I am fine. Thank you!</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">ϻı ʘ⎸Ϟ○ ϻ○. Яʘ ┬∪!</div>
                        <div className="text-sm text-muted-foreground">mi also mo. ra tu!</div>
                        <div className="text-foreground">I am also fine. Thank you!</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Asking for Help</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">ϻı ﬡʘ Ϟı. ┬∪ ║Σ⎸Ϸ ϻı?</div>
                        <div className="text-sm text-muted-foreground">mi na si. tu help mi?</div>
                        <div className="text-foreground">I don't understand. Can you help me?</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">⎸○! ϻı ║Σ⎸Ϸ ┬∪.</div>
                        <div className="text-sm text-muted-foreground">lo! mi help tu.</div>
                        <div className="text-foreground">Yes! I will help you.</div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-2xl text-primary">Яʘ ┬∪! ┬∪ ϻ○ ⎸ʘ.</div>
                        <div className="text-sm text-muted-foreground">ra tu! tu mo la.</div>
                        <div className="text-foreground">Thank you! You are a good friend.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Numbers Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { num: "1", rom: "una", sym: "∪ﬡʘ" },
                      { num: "2", rom: "dua", sym: "∂∪ʘ" },
                      { num: "3", rom: "tre", sym: "┬ЯΣ" },
                      { num: "4", rom: "fura", sym: "ƒ∪Яʘ" },
                      { num: "5", rom: "fiva", sym: "ƒı√ʘ" },
                    ].map((item) => (
                      <div key={item.num} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                        <span className="text-foreground">{item.num}</span>
                        <span className="font-mono text-muted-foreground">{item.rom}</span>
                        <span className="font-mono text-xl text-primary">{item.sym}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Family Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { eng: "father", rom: "pata", sym: "Ϸʘ┬ʘ" },
                      { eng: "mother", rom: "mata", sym: "ϻʘ┬ʘ" },
                      { eng: "brother", rom: "brota", sym: "ꓐЯ○┬ʘ" },
                      { eng: "sister", rom: "sista", sym: "ϞıϞ┬ʘ" },
                      { eng: "friend", rom: "la", sym: "⎸ʘ" },
                    ].map((item) => (
                      <div key={item.eng} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                        <span className="text-foreground capitalize">{item.eng}</span>
                        <span className="font-mono text-muted-foreground">{item.rom}</span>
                        <span className="font-mono text-xl text-primary">{item.sym}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              {/* Mobile: Show Guttin symbols only */}
              <div className="sm:hidden text-lg font-bold text-primary font-mono">Ϭ∪┬┬ıﬡ ⎸ıﬡϬ√ʘ</div>
              {/* Desktop: Show both symbols and English */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary">
                  <span className="font-mono">Ϭ∪┬┬ʘﬡ</span>
                </div>
                <span className="text-sm text-muted-foreground hidden md:inline">Guttin Language</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#alphabet" className="text-muted-foreground hover:text-foreground transition-colors">
                Alphabet
              </a>
              <a href="#translator" className="text-muted-foreground hover:text-foreground transition-colors">
                Translator
              </a>
              <a href="#keyboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Keyboard
              </a>
              <a href="#introduction" className="text-muted-foreground hover:text-foreground transition-colors">
                Learn
              </a>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              Welcome to <span className="text-primary font-mono">Ϭ∪┬┬ʘﬡ</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Discover the mysteries of Guttin, an ancient language reborn. Explore its unique symbols, learn its
              grammar, and unlock the secrets of this otherworldly tongue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              <a href="#introduction">Start Learning</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <a href="#alphabet">Explore Alphabet</a>
            </Button>
          </div>

          {/* Featured Symbols */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-md mx-auto">
            {["ʘ", "ꓐ", "ᐭ", "∂", "Σ", "ƒ"].map((symbol, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                <div className="text-2xl font-mono text-center text-primary">{symbol}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AlphabetShowcase />

      <GuttinTranslator />

      {/* Guttin Virtual Keyboard section */}
      <GuttinKeyboard />

      <GuttinIntroduction />

      {/* Quick Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-primary">ʘꓐᐭ</span>
                  Alphabet
                </CardTitle>
                <CardDescription>Explore the 26 unique symbols that form the Guttin writing system</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-primary">∂○ʘ</span>
                  Translator
                </CardTitle>
                <CardDescription>Translate between English and Guttin with our basic dictionary</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-primary">⋉Σ┬</span>
                  Keyboard
                </CardTitle>
                <CardDescription>Type in Guttin using our virtual keyboard interface</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-mono text-primary">ﬡ○ʘ</span>
                  Learn
                </CardTitle>
                <CardDescription>Discover the grammar rules and structure of the Guttin language</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Text */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Experience Guttin</h2>
          <Card className="p-8 bg-card border-2">
            <div className="space-y-4">
              <div className="text-3xl font-mono text-primary leading-relaxed">⋉ʘ! ⋉Σ ┬∪ ϻ○?</div>
              <div className="text-lg text-muted-foreground">"Hello! How are you?"</div>
              <div className="text-3xl font-mono text-primary leading-relaxed">ϻı ϻ○. Яʘ ┬∪!</div>
              <div className="text-lg text-muted-foreground">"I am fine. Thank you!"</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            <span className="font-mono text-primary">Ϭ∪┬┬ʘﬡ</span> - A constructed language in development
          </p>
        </div>
      </footer>
    </div>
  )
}
