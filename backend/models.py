import sqlite3 as sql

def initialize():
	con = sql.connect("database.db")
	cur = con.cursor()
	cur.execute(open("schema.sql", "r").read())

def insertUser(email,password,account_id):
    con = sql.connect("database.db")
    cur = con.cursor()
    cur.execute("INSERT INTO users (email,password,account_id) VALUES (?,?,?)", (email,password,account_id))
    con.commit()
    con.close()

def retrieveUser(email):
	con = sql.connect("database.db")
	cur = con.cursor()
	cur.execute("SELECT email, password, account_id FROM users WHERE EMAIL=(?)", (email,))
	users = cur.fetchone()
	con.close()
	return users