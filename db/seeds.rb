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
    status: :open,
    end_at: Time.zone.local(2019, 9, 30, 10, 30)
  },
  {
    title: 'ウェブアプリケーション機能開発',
    description: '個人で開発しているプロジェクトの機能開発を手伝ってください',
    status: :open,
    end_at: Time.zone.local(2019, 10, 10, 11, 30)
  },
  {
    title: 'ウェブアプリケーション機能開発(Rails)',
    description: 'Rails, React, MySQLを使っているウェブアプリの機能開発を手伝ってください。Slack, Jira, GitHubを習得できます',
    status: :open,
    end_at: Time.current + 1.week,
  },
])

user1 = User.first
user2 = User.second
Message.create([
  {
    sender: user1,
    recipient: user2,
    content: 'こんにちは',
    read_at: Time.zone.local(2019, 10, 3, 10, 30),
  },
  {
    sender: user1,
    recipient: user2,
    content: '今日はカレーを食べました',
    read_at: Time.zone.local(2019, 10, 4, 10, 30),
  },
  {
    sender: user1,
    recipient: user2,
    content: '元気ですか',
    read_at: Time.zone.local(2019, 10, 4, 11, 30),
  },
  {
    sender: user2,
    recipient: user1,
    content: 'カレーうどんもいいですよ',
    read_at: Time.zone.local(2019, 10, 4, 10, 25),
  },
  {
    sender: user2,
    recipient: user1,
    content: 'おやすみなさい',
    read_at: nil,
  },
])
