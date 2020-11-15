package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class History {
	int historyID
	String author
	int fileID
	int userID
	String type
	String title
	LocalDateTime date
}
