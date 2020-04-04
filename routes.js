'use strict';
var jsonku = require('./controller');

module.exports = function (app) {
    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilsemuamahasiswa);

    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);
    app.route('/tambah')
        .post(jsonku.tambahMahasiswa);

    app.route('/ubah')
        .put(jsonku.ubahMahasiswa);
    app.route('/hapus')
        .delete(jsonku.hapusMahasiswa);

    // app.route('/tampilmatakuliah')
    //     .get(jsonku.tampilgroupmatakuliah);

}