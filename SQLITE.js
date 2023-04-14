import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("database.db");

export default class DatabaseManager {

	static initializeDatabase() {
		console.log(db);
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists\
                    contacts (\
                        contact_id integer primary key autoincrement not null,\
                        name text not null,\
						lastname text not null,\
						phone text not null\
                );"
            );
        }, (e) => { console.log("ERREUR + " + e) },
            () => { console.log("OK + ") }
        );
    }

	static ExecuteQuery = (sql, params) => new Promise((resolve, reject) => {
		db.transaction((trans) => {
			trans.executeSql(
				sql, 
				[params], 
				(trans, results) => {
					// console.log('RESULTS : ', results);
					resolve(results);
				},
				(trans, error) => {
					// console.log('ERROR : ', error);
					reject(error);
				});
		});
	});

	static async insert(tbl, fields, values) {
		// let sql = `INSERT INTO ${tbl} (${fields}) VALUES (${values})`;
		let valuesArr = values.map(value => `'${value}'`).join(',');
		let sql = `INSERT INTO ${tbl} (${fields}) VALUES (${valuesArr})`;
		// console.log(sql);
		db.transaction(trx => {
			let trxQuery = trx.executeSql(
				 sql
				,[values]
				,(transact,resultset) => console.log('we made it',resultset)
				,(transact,err) => console.log('We have encounter an Error', err)
		   );
		})
	}

	static update(id, name, lastname, phone) {
		return new Promise((resolve, reject) => {
		  let sql = `UPDATE contacts SET name='${name}', lastname='${lastname}', phone='${phone}' WHERE contact_id=${id}`;
		  db.transaction(trx => {
			trx.executeSql(
			  sql,
			  [],
			  (transact, resultset) => {
				console.log('Update successful', resultset);
				resolve(resultset);
			  },
			  (transact, err) => {
				console.log('Update failed', err);
				reject(err);
			  }
			);
		  });
		});
	  }
	  
	  static delete(id) {
		return new Promise((resolve, reject) => {
		  let sql = `DELETE FROM contacts WHERE contact_id=${id}`;
		  db.transaction(trx => {
			trx.executeSql(
			  sql,
			  [],
			  (transact, resultset) => {
				console.log('Delete successful', resultset);
				resolve(resultset);
			  },
			  (transact, err) => {
				console.log('Delete failed', err);
				reject(err);
			  }
			);
		  });
		});
	  }

	static async getAllContact() {

		let result = [];
		let selectQuery = await this.ExecuteQuery("SELECT * FROM contacts", []);
		
		var rows = selectQuery.rows;
		// console.log('ROW', rows);
		for (let i = 0; i < rows.length; i++) {
			var item = rows.item(i);
			result.push({
				name: item.name,
				lastname: item.lastname,
				phone: item.phone,
				contact_id: item.contact_id
			});
		}
		// console.log('RESULT', result);
		return result;
	}

	static async createContact(Name, LastName, Phone) {
		await this.ExecuteQuery("insert into contact (name, lastname, phone) values (?, ?, ?)", [Name, LastName, Phone]);
	}

	static async deleteContactWithId(id) {
		try {
			await this.ExecuteQuery("DELETE FROM contacts WHERE contact_id=?", [id]);
		} catch (error) {
			console.log('ERROR', error);
		}
	}

	static async updateContactWithId(id, Name, LastName, Phone) {
		await this.ExecuteQuery("UPDATE contact SET name=?, lastname=?, phone=? WHERE contact_id=?", [Name, LastName, Phone, id]);
	}

}