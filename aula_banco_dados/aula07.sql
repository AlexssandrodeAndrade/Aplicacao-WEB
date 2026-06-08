-- =========================================
-- 01 INNER JOIN
-- =========================================

SELECT aluno.nome, turma.nome
FROM aluno
INNER JOIN matricula ON aluno.id = matricula.aluno_id
INNER JOIN turma ON turma.id = matricula.turma_id;

-- =========================================
-- 02 LEFT JOIN
-- =========================================

SELECT aluno.nome, turma.nome
FROM aluno
LEFT JOIN matricula ON aluno.id = matricula.aluno_id
LEFT JOIN turma ON turma.id = matricula.turma_id;

-- =========================================
-- 03 LEFT JOIN
-- =========================================

SELECT aluno.nome, turma.nome
FROM turma
LEFT JOIN matricula ON turma.id = matricula.turma_id
LEFT JOIN aluno ON aluno.id = matricula.aluno_id;

-- =========================================
-- 04 FULL JOIN
-- =========================================

SELECT aluno.nome, turma.nome
FROM aluno
FULL JOIN matricula ON aluno.id = matricula.aluno_id
FULL JOIN turma ON turma.id = matricula.turma_id;

-- =========================================
-- 05
-- =========================================

SELECT aluno.nome,
NULL AS nome_turma
FROM aluno
LEFT JOIN matricula ON aluno.id = matricula.aluno_id
WHERE matricula.id IS NULL;

-- =========================================
-- 06
-- =========================================

SELECT NULL AS nome_aluno, turma.nome
FROM turma
LEFT JOIN matricula ON turma.id = matricula.turma_id
WHERE matricula.id IS NULL;

