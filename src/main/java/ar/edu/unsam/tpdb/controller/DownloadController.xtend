package ar.edu.unsam.tpdb.controller

import ar.edu.unsam.tpdb.formularios.DownloadQuery
import ar.edu.unsam.tpdb.formularios.FilterOrden
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
	def busqueda(@PathVariable Integer userId, @RequestBody FilterOrden body) {
		println(body)
		try {
			val downloads = new DownloadQuery().searchDownloadsOf(userId, body)
			ResponseEntity.ok(downloads)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}


	@GetMapping("/averageDownload/{userId}")
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
			//Aca faltaria parametrizar
			val average = new DownloadQuery().downloadsByDateQuery(user_id, month, year)
			ResponseEntity.ok(average)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsLast12Month/{user_id}")
	def downloadsLast12Month(@PathVariable Integer user_id) {
		try {
			val average = new DownloadQuery().downloadsLast12MonthsQuery(user_id)
			ResponseEntity.ok(average)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
	
	
	@GetMapping("/downloadsAverage/{user_id}")
	def downloadsAverage(@PathVariable Integer user_id) {
		try {
			val average = new DownloadQuery().downloadAverageQuery(user_id,'reproduction')
			ResponseEntity.ok(average)
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

