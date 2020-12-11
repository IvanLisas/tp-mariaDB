package ar.edu.unsam.tpdb.controller

import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import java.sql.SQLException
import org.springframework.http.ResponseEntity
import ar.edu.unsam.tpdb.formularios.FileQuery

@CrossOrigin
@RestController
class FileController {
	@PutMapping("/searchFiles")
	def searchDownloadsOf(@RequestBody String body) {
		println(body)
		try {
			val files = new FileQuery().searchFiles(body)
			ResponseEntity.ok(files)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
}
