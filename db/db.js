export const sqlQuery = `
SELECT DISTINCT
 position.value as position,
 name.value as name,
 img.value as img,
 submission.submission_id as submission_id,
 active.value as active
FROM 
 wp_e_submissions_values as position,
 wp_e_submissions_values as name,
 wp_e_submissions_values as img,
 wp_e_submissions_values as submission,
 wp_e_submissions_values as active
WHERE
 position.key  = "position" and
 name.key = "name" and
 img.key = "field_417c055" and 
 active.key = "active" and
 img.submission_id = submission.submission_id and
 position.submission_id = submission.submission_id and
 name.submission_id = submission.submission_id and 
 active.submission_id = submission.submission_id
ORDER BY submission_id DESC
LIMIT 
  300`;