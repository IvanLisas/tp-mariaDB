package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Accion {
	int id
	LocalDateTime date_init
	LocalDateTime date_end
	String type
}