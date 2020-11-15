package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors

class Reproduction {
	int historyID
	LocalDateTime startDate
	int reproductionID
	LocalDateTime endDate
	LocalDateTime endDateHour
	String usedOS

}
