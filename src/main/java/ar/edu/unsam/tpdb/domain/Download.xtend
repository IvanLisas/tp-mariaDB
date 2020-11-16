package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Download {
	int id
	int speed
	int accion_id
	int archive_id
}