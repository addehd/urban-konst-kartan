export const sqlQuery = `
SELECT DISTINCT
 position.value as position,
 name.value as name,
 img.value as img,
 submission.submission_id as submission_id,
 active.value as active,
 artist_name.value as artist,
 photograf.value as photograf,
 artinfo.value as artinfo,
 geotip.value as geotip
FROM 
 wp_e_submissions_values as position,
 wp_e_submissions_values as name,
 wp_e_submissions_values as img,
 wp_e_submissions_values as submission,
 wp_e_submissions_values as artist_name,
 wp_e_submissions_values as photograf,
 wp_e_submissions_values as active,
 wp_e_submissions_values as artinfo,
 wp_e_submissions_values as geotip
WHERE
 position.key = "position" and
 name.key = "name" and
 artist_name.key = "konstnar" and
 photograf.key = "fotograf" and
 img.key = "field_417c055" and 
 active.key = "active" and
 artinfo.key = "artInfo" and
 geotip.key = "geotips" and
 artinfo.submission_id = submission.submission_id and
 geotip.submission_id = submission.submission_id and
 photograf.submission_id = submission.submission_id and
 img.submission_id = submission.submission_id and
 position.submission_id = submission.submission_id and
 name.submission_id = submission.submission_id and
 artist_name.submission_id = submission.submission_id and
 active.submission_id = submission.submission_id
ORDER BY submission_id DESC
LIMIT 
  300`;