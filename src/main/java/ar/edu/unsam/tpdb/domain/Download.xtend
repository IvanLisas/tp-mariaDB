package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Download {
	int historyID
	int transferSpeed
	int downloadID
	String user
}