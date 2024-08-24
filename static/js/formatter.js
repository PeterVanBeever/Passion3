document.addEventListener('DOMContentLoaded', function () {
    const sqlInput = document.getElementById('user_validate');
    const wordCountDisplay = document.getElementById('word_count_display');

    if (sqlInput && wordCountDisplay) {
        let timeoutId;

        function handleInput() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const rawText = sqlInput.innerText;
                const formattedSQL = formatSQLSyntax(rawText);

                // Only update the innerHTML if the content has changed to avoid unnecessary resets
                if (sqlInput.innerHTML !== formattedSQL) {
                    sqlInput.innerHTML = formattedSQL;
                    setEndOfContenteditable(sqlInput);
                }

                const wordCount = getWordCount(sqlInput.innerText);
                wordCountDisplay.innerText = `Word Count: ${wordCount}`;
            }, 200);
        }

        sqlInput.addEventListener('input', handleInput);
    } else {
        console.error('Element with id "user_validate" or "word_count_display" not found.');
    }
});

function formatSQLSyntax(sql) {
    // Define regex patterns
    const keywords = /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|AND|OR|NOT|IN|AS|IS|NULL|ON|THEN|END|ELSE|WHEN|JOIN|CASE|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT)\b/gi;
    const tables = /\b(events|persons)\b/gi;
    const columnNames = /\b(age|moment|what|item|location|persons_id)\b/gi; // Define column names
    const syntaxCheck = /\b(Valid|Invalid)\b/gi;
    const other = /\b(turtle|soup|Peter)\b/gi; // Regex pattern for specific words

    // Temporarily wrap columns and tables to avoid conflicts
    let tempSql = sql
        .replace(columnNames, '<span class="temp-column">$1</span>')
        .replace(tables, '<span class="temp-table">$1</span>');

    // Apply SQL syntax highlighting
    tempSql = tempSql
        .replace(keywords, '<span class="sql-keyword">$1</span>') // Highlight SQL keywords
        .replace(/(\*|,|\(|\))/g, '<span class="sql-symbol">$1</span>') // Highlight symbols
        .replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>') // Highlight numbers
        .replace(/,/g, '<span class="sql-comma">,</span>') // Highlight commas
        .replace(/;/g, '<span class="sql-semicolon">;</span>') // Highlight semicolons
        .replace(syntaxCheck, '<span class="sql-syntax-check">$1</span>'); // Highlight Valid/Invalid

    // Apply final formatting for columns and tables
    tempSql = tempSql
        .replace(/<span class="temp-column">(.*?)<\/span>/g, '<span class="sql-column">$1</span>') // Finalize column formatting
        .replace(/<span class="temp-table">(.*?)<\/span>/g, '<span class="sql-table">$1</span>'); // Finalize table formatting

    // Apply green formatting with single quotes specifically for the words "turtle", "soup", "Peter"
    tempSql = tempSql.replace(other, '<span class="temp-green">$1</span>');

    // Add single quotes around the green words with a span for single quotes
    tempSql = tempSql.replace(/(?<!')(<span class="temp-green">(.*?)<\/span>)(?!')/g, "<span class='sql-single-quote'>'</span>$1<span class='sql-single-quote'>'</span>");

    // Clean up: remove temporary markers
    tempSql = tempSql.replace(/<span class="temp-green">(.*?)<\/span>/g, '<span class="sql-green">$1</span>');

    return tempSql;
}

function getWordCount(text) {
    return text.trim().split(/\s+/).length;
}

function setEndOfContenteditable(contentEditableElement) {
    let range, selection;
    if (document.createRange) {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}
