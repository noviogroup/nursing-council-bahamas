-- Applied 12 November 2026. The Council's address is Capital House, not Capitol House.
-- Corrects the complaint email templates added in 20261103121024 (that file keeps the
-- old spelling as applied); src/lib/complaint-email-templates.ts already reads Capital House.
update public.notification_templates
set body_template = replace(body_template, 'Capitol House', 'Capital House'),
    subject_template = replace(subject_template, 'Capitol House', 'Capital House'),
    updated_at = now()
where body_template like '%Capitol House%' or subject_template like '%Capitol House%';
