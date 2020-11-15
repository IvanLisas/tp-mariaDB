package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime

class History {
	int historyID
	String author
	int fileID
	int userID
	String type
	String title
	LocalDateTime date
}
