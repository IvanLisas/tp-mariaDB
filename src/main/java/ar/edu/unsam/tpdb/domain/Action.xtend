package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Action {
	int id
	String date_init
	String date_end
	String type
}