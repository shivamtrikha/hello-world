// place files you want to import through the `$lib` alias in this folder.
import PropTypes from "prop-types"
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import DisclaimerBanner from "./DisclaimerBanner"

const CodeEditor = forwardRef(function CodeEditor({ code, onCodeChange, isLoading, onClear }, ref) {
  const [copySuccess, setCopySuccess] = useState(false)
  const textareaRef = useRef(null)
  const lineNumbersRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        // Move cursor to end of text
        textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length)
      }
    },
  }))

  // Handle scrolling synchronization between code and line numbers
  useEffect(() => {
    const textarea = textareaRef.current
    const lineNumbers = lineNumbersRef.current

    const handleScroll = () => {
      if (lineNumbers) lineNumbers.scrollTop = textarea.scrollTop
    }

    textarea?.addEventListener("scroll", handleScroll)
    return () => textarea?.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle line numbers update when content changes
  useEffect(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      const lineCount = code.split("\n").length
      lineNumbersRef.current.innerHTML = Array.from(
        { length: Math.max(12, lineCount) },
        (_, i) => `<div class="px-2 py-1">${i + 1}</div>`,
      ).join("")
    }
  }, [code])

  const handleCopyToClipboard = () => {
    // Only copy if not in a loading state
    if (!isLoading) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        })
        .catch(() => {
          // Silent fail - don't show error to user
        })
    }
  }

  const handleClear = () => {
    if (!isLoading && onClear) {
      onClear()
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-300 dark:border-gray-700/50 overflow-hidden shadow-2xl transition-colors duration-200">
      <div className="bg-gray-200/90 dark:bg-gray-800/90 px-4 py-3 border-b border-gray-300 dark:border-gray-700/50 flex items-center justify-between backdrop-blur-sm">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-sans">Code Editor</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyToClipboard}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition-colors relative"
            title="Copy to clipboard"
            disabled={isLoading}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
            </svg>
            {copySuccess && (
              <span className="absolute -top-8 -right-2 bg-gray-600 dark:bg-gray-700 text-xs text-white px-2 py-1 rounded whitespace-nowrap font-sans">
                Copied!
              </span>
            )}
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handleClear}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"
              title="Clear code and results"
              disabled={isLoading}
            />
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="absolute left-0 top-0 bottom-0 w-12 bg-gray-200/80 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col text-xs text-gray-800 dark:text-gray-400 font-mono overflow-y-auto transition-colors duration-300"
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="px-2 py-1">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <textarea
          ref={textareaRef}
          className="w-full h-80 bg-transparent text-gray-900 dark:text-gray-100 font-mono text-sm pl-16 pr-4 py-4 resize-none focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-gray-600 dark:placeholder:text-gray-400 transition-colors duration-200"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <DisclaimerBanner />
    </div>
  )
})

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClear: PropTypes.func,
}

export default CodeEditor
