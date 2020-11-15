package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Document {
	int fileID
	String title =""
	String type =""
	LocalDateTime date 
	String author =""
}