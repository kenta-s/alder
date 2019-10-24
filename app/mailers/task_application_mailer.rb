class TaskApplicationMailer < ApplicationMailer
  def applied
    @task = params[:task]
    @user = params[:user]
    admin = User.admin.first
    mail(to: admin.email, subject: 'タスクに応募がありました')
  end
end
