package ar.edu.unsam.tpdb.controller

import org.springframework.web.bind.annotation.GetMapping
import ar.edu.unsam.tpdb.formularios.UserQuery
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.http.ResponseEntity
import java.sql.SQLException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ar.edu.unsam.tpdb.formularios.DownloadQuery
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.PutMapping

@CrossOrigin
@RestController
class DownloadController {
	@GetMapping("/allDownloads/{userId}")
	def allDownloads(@PathVariable Integer userId) {
		try {
			val downloads = new DownloadQuery().allDownloadsOf(userId, '')
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
			println(e.message)
		}
	}

	@GetMapping("/downloadsByAscName/{userId}")
	def descOrderByNameAsc(@PathVariable Integer userId) {
		try {
			val downloads = new DownloadQuery().downloadsByAscName(userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsByDesName/{userId}")
	def descOrderByNameDown(@PathVariable Integer userId) {
		try {
			val downloads = new DownloadQuery().downloadsByDesName(userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/averageDownload/{userId}")
	def promedio(@PathVariable Integer userId) {
		try {
			val average = new DownloadQuery().averageDownload(userId)
			ResponseEntity.ok(average)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@PutMapping("/searchDownloadsOf/{userId}")
	def busqueda(@RequestBody String body, @PathVariable Integer userId) {
		println(body)
		try {
			val downloads = new DownloadQuery().searchDownloadsOf(userId, body)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

}
