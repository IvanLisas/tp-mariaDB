package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors
import java.time.LocalDateTime

@Accessors
class Music {
	int fileID
	String title =""
	String type =""
	LocalDateTime date 
	String author =""
}