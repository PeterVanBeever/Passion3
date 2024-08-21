INSERT INTO query_templates (
    challenge_id, sql_template_id, complexity, description,
    seq1, seq2, seq3, seq4, seq5, seq6, seq7, seq8, seq9, seq10,
    seq11, seq12, seq13, seq14, seq15, seq16, seq17, seq18, seq19, seq20
) VALUES
(1001, 1, 'simple', 'Filters rows based on a condition.', 
1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1002, 2, 'simple', 'Combines clauses to filter and aggregate data.',
1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1003, 3, 'moderate', 'Joins multiple tables with conditions.'
,1, 27, 3, 4, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1004, 4, 'complex', 'Combines multiple joins and aggregation functions.',
 27, 31, 6, 10, 48, 49, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1005, 5, 'complex', 'Uses various joins, aggregations, and set operations.',
 27, 28, 29, 30, 31, 50, 51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1006, 6, 'moderate', 'Applies conditional logic with filters and aggregation.',
 1, 3, 41, 42, 43, 44, 45, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1007, 7, 'simple', 'Combines filtering, conditional logic, and subqueries.',
 1, 4, 6, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL),
(1008, 8, 'complex', 'Advanced query with multiple joins and string functions.',
 27, 31, 50, 58, 59, 60, 61, 62, 63, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1009, 9, 'moderate', 'Filters data with pattern matching and set operations.',
 1, 8, 9, 10, 23, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1010, 10, 'complex', 'Complex query with multiple joins and aggregations.',
 27, 31, 50, 53, 54, 55, 56, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
