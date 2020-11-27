package ar.edu.unsam.tpdb.controller

import org.springframework.web.bind.annotation.GetMapping
import ar.edu.unsam.tpdb.formularios.UserQuery
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.http.ResponseEntity
import java.sql.SQLException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
class DownloadController {
	@GetMapping("/allDownloads/{userId}")
	def allDownloads(@PathVariable Integer userId) {
		try {
			val downloads = new UserQuery().todasLasDescargasDe(userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsByAscName/{userId}")
	def descOrderByNameAsc(@PathVariable Integer userId) {
		try {
			val downloads = new UserQuery().downloadsByAscName(userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/downloadsByDesName/{userId}")
	def descOrderByNameDown(@PathVariable Integer userId) {
		try {
			val downloads = new UserQuery().downloadsByDesName(userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/averageDownload/{userId}")
	def promedio(@PathVariable Integer userId) {
		try {
			val downloads = new UserQuery().averageDownload(userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/searchDownloadsOf/{userId}/{busqueda}")
	def busqueda(@PathVariable String busqueda, @PathVariable Integer userId) {
		try {
			val downloads = new UserQuery().searchDownloadsOf(busqueda, userId)
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

}
