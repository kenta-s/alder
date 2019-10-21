json.id @task.id
json.title @task.title
json.description @task.description
json.status @task.status
json.end_at @task.end_at
json.task_applications do
  json.array! @task.task_applications do |task_application|
    json.id task_application.id
    json.applicant_id task_application.user.id
    json.applicant_name task_application.user.name
    json.status task_application.status
    json.task_id task_application.task_id
  end
end
