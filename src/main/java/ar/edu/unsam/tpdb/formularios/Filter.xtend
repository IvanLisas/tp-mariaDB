package ar.edu.unsam.tpdb.formularios

class Filter {
	
	def byAscFileName() { ' ORDER BY file.title ASC' }

	def byDesFileName() { ' ORDER BY file.title DESC' }
	
	def byFileName(String keyword) { ' and file.title like "%' + keyword + '%" or file.extension_type like "%' + keyword + '%"' }	
}