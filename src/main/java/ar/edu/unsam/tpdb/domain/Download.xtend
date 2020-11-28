package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Download extends Action {
	int download_id
	double speed
}