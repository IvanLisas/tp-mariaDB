package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class File {
	int fileID
	String title = ""
	Double size
	String extention = ""
	String type = ""
	LocalDateTime uploadDate

}
