package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
abstract class Action {
	int action_id
	String date_init
	String date_end
	String type
	File file
	int user_id
}