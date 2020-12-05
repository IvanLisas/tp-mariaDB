package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors
import java.sql.ResultSet
import java.util.List
import java.util.ArrayList

@Accessors
abstract class Action {
	int action_id
	String date_init
	String date_end
	String type
	File file
	int user_id
}

@Accessors
class Download extends Action {
	int download_id
	double speed
	
	// Factory
	def downloadsFactory(ResultSet downloadResult) {
		var List<Download> downloads = new ArrayList()

		while (downloadResult.next) {
			val _file = new File().fileFactory(downloadResult)

			downloads.add(new Download() => [
				download_id = downloadResult.getInt("download.id")
				speed = downloadResult.getDouble("speed")
				action_id = downloadResult.getInt("action.id")
				date_init = downloadResult.getString("date_init")
				file = _file
			])
		}
		downloads
	}
}


@Accessors
class Reproduction extends Action {
	int reproduction_id
	String os

	// Factory
	def reproductionsFactory(ResultSet reproductionResult) {
		var List<Reproduction> reproductions = new ArrayList()

		while (reproductionResult.next) {
			val _file = new File().fileFactory(reproductionResult)

			reproductions.add(new Reproduction() => [
				reproduction_id = reproductionResult.getInt("reproduction.id")
				os = reproductionResult.getString("os")
				action_id = reproductionResult.getInt("action.id")
				date_init = reproductionResult.getString("date_init")
				file = _file
			])
		}
		reproductions
	}

}

@Accessors
class ActionsCount {
	String month
	int count
	int year

	def factory(ResultSet reproductionResult) {
		var List<ActionsCount> reproductionCount = new ArrayList()

		while (reproductionResult.next) {
			reproductionCount.add(new ActionsCount() => [
				month = Translator.get.translator(reproductionResult.getString("MONTH"))
				year = reproductionResult.getInt("year")
				count = reproductionResult.getInt("count")
			])
		}
		reproductionCount
	}
}
