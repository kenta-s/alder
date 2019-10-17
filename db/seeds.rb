# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  {
    name: 'admin',
    uid: 'aaa',
    email: 'admin@example.com',
    password: 'aaaaaa',
    confirmed_at: Time.now,
    status: :admin,
  },
  {
    name: 'user1',
    uid: 'bbb',
    email: 'user1@example.com',
    password: 'aaaaaa',
    confirmed_at: Time.now,
    status: :professional,
  },
  {
    name: 'user2',
    uid: 'ccc',
    email: 'user2@example.com',
    password: 'aaaaaa',
    confirmed_at: Time.now,
    status: :apprentice,
  }
])

Task.create([
  {
    title: '求人サイトをクロールしてDBにデータを格納',
    description: '求人サイトをクロールしてDB（MySQL）にデータを格納してください',
    end_at: Time.zone.local(2019, 9, 30, 10, 30)
  },
  {
    title: 'ウェブアプリケーション機能開発',
    description: '個人で開発しているプロジェクトの機能開発を手伝ってください',
    end_at: Time.zone.local(2019, 10, 10, 11, 30)
  },
  {
    title: 'ウェブアプリケーション機能開発(Rails)',
    description: 'Rails, React, MySQLを使っているウェブアプリの機能開発を手伝ってください。Slack, Jira, GitHubを習得できます',
    end_at: Time.current + 1.week,
  },
])
