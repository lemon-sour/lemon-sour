// import * as childProcess from 'child_process';
import AdmZip from 'adm-zip';
import razer from 'razer';

async function unzip(
  appName: string,
  zipFile: string,
  tempPath: string,
  callback: () => void = function () {}
) {
  // const zipFile = tempPath + '/' + appName + '.' + extension;
  // let _tempPath = tempPath + '\\' + appName;

  return new Promise<object>(
    (resolve: (value?: object) => void, reject: (err: any) => void) => {
      // https://github.com/cthackers/adm-zip
      // reading archives
      const zip = new AdmZip(zipFile);
      const zipEntries = zip.getEntries(); // an array of ZipEntry records

      zipEntries.forEach(function (zipEntry) {
        razer('zipEntry.entryName:', zipEntry.entryName.toString()); // outputs zip entries information
        // console.log(zipEntry.data.toString('utf8'));
      });
      // outputs the content of some_folder/my_file.txt
      // console.log(zip.readAsText("some_folder/my_file.txt"));
      // extracts the specified file to the specified location
      // zip.extractEntryTo(/*entry name*/zipFile, /*target path*/C.tempPath, /*maintainEntryPath*/false, /*overwrite*/true);
      // extracts everything
      zip.extractAllTo(/*target path*/ tempPath, /*overwrite*/ true);
      callback();
      resolve();

      // https://github.com/maxogden/extract-zip
      // extract(zipFile, {dir: C.tempPath}, function (err) {
      //   resolve();
      // });

      // fs.createReadStream(zipFile).pipe(unzip.Extract({path: C.tempPath}));

      // https://github.com/antelle/node-stream-zip
      // var zip = new StreamZip({
      //   file: zipFile,
      //   storeEntries: true
      // });
      // zip.on('error', function(err) {
      //   console.error(err);
      // });
      // zip.on('ready', function() {
      //   console.log('Entries read: ' + zip.entriesCount);
      //   // stream to stdout
      //   // zip.stream('node/benchmark/net/tcp-raw-c2s.js', function(err, stm) {
      //   //     stm.pipe(process.stdout);
      //   // });
      //   // extract file
      //   // zip.extract('electron/snapshot_blob.bin', './temp/', function(err) {
      //   //     console.log('Entry extracted');
      //   // });
      //   // extract folder
      //   zip.extract('win-unpacked/locales', './temp/', function(err, count) {
      //       console.log('Extracted ' + count + ' entries');
      //   });
      //   // extract all
      //   zip.extract(null, './temp/', function(err, count) {
      //       console.log('Extracted ' + count + ' entries');
      //   });
      //   // read file as buffer in sync way
      //   // var data = zip.entryDataSync('README.md');
      // });
      // zip.on('extract', function(entry, file) {
      //   console.log('Extracted ' + entry.name + ' to ' + file);
      // });
      // zip.on('entry', function(entry) {
      //   // called on load, when entry description has been read
      //   // you can already stream this entry, without waiting until all entry descriptions are read (suitable for very large archives)
      //   // zip.extract(entry.name, './temp/unzip', function(err) {
      //   //   // console.log('Entry extracted', entry.name);
      //   // });
      //   // console.log('Read entry ', entry.name);
      // });

      // via http://fla-moo.blogspot.jp/2013/05/7-zip.html
      // childProcess.execFile('"' + C.rootPath + C.unzipToolPath + '" x -y -o' + _tempPath + ' ' + zipFile, [], (err, stdout, stderr) => {

      // http://qiita.com/nyamogera/items/0aaff641c07c9b5aec51
      // childProcess.execFile(unzipExePath, ['x', '-y', '-o' + _tempPath, zipFile], (err, stdout, stderr) => {
      //   if (err) {
      //     reject(err);
      //     return;
      //   }
      //   console.log(stdout);
      //
      //   resolve();
      //
      //   console.log('_unzip end');
      // });
      // let result = childProcess.execSync('".\\tools\\7za920\\7za.exe" x -y -o.\\temp\\ .\\temp\\electron.zip');
      // console.log(result);
    }
  );
}

export default unzip;
