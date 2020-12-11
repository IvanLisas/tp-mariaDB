package ar.edu.unsam.tpdb.controller

import ar.edu.unsam.tpdb.formularios.DownloadQuery
import ar.edu.unsam.tpdb.formularios.FilterOrden
import ar.edu.unsam.tpdb.formularios.StatsQuery
import java.sql.SQLException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
class DownloadController {

	@PutMapping("/searchDownloadsOf/{userId}")
	def searchDownloadsOf(@PathVariable Integer userId, @RequestBody FilterOrden body) {
		println(body)
		try {
			val downloads = new DownloadQuery().searchDownloadsOf(userId, body)
			ResponseEntity.ok(downloads)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadSpeedAvg/{userId}")
	def downloadSpeedAvg(@PathVariable Integer userId) {
		try {
			val average = new DownloadQuery().speedAvg(userId)
			ResponseEntity.ok(average)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsByDate/{user_id}/{month}/{year}")
	def downloadsByDate(@PathVariable Integer user_id, @PathVariable Integer month, @PathVariable Integer year) {
		try {
			// Aca faltaria parametrizar
			val average = new StatsQuery().actionsByDate(user_id, month, year, 'download')
			ResponseEntity.ok(average)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsLast12Months/{user_id}")
	def downloadsLast12Month(@PathVariable Integer user_id) {
		try {
			val average = new StatsQuery().actionsLast12Months(user_id, 'download')
			ResponseEntity.ok(average)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsAverage/{user_id}")
	def downloadsAverage(@PathVariable Integer user_id) {
		try {
			val average = new StatsQuery().actionsAverage(user_id, 'download')
			ResponseEntity.ok(average)
			
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
	
	@PutMapping("/countDownloands/{userId}")
	def countDownloands(@PathVariable Integer userId, @RequestBody FilterOrden body) {
		println(body)
		try {
			val downloads = new StatsQuery().countActions(userId, body,'download')
			ResponseEntity.ok(downloads)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

// @GetMapping("/allDownloads/{userId}")
//	def allDownloads(@PathVariable Integer userId) {
//		try {
//			val downloads = new DownloadQuery().allDownloadsOf(userId, '')
//			ResponseEntity.ok(downloads)
//
//		} catch (SQLException e) {
//			ResponseEntity.badRequest.body(e.message)
//			println(e.message)
//		}
//	}
}
