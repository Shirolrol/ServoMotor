const gulp = require("gulp");
const inline = require("gulp-inline");
const gzip = require("gulp-gzip");
const through = require("through2");

gulp.task("default", () => {
  return gulp
    .src("./dist/*/*.html")
    .pipe(inline())
    .pipe(gulp.dest("./single-dist"))
    .pipe(gzip())
    .pipe(
      through.obj((chunk, enc, cb) => {
        console.log("------------------------"); // this should log now
        const buffer = chunk.contents;
        const arrayBuffer = new ArrayBuffer(buffer.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
          view[i] = buffer[i];
        }
        let res = `
        #define angular_gz_len ${view.length}
        const uint8_t angular_gz[] = { ${view.join(", ")} };`;
        chunk.contents = Buffer.from(res, enc);
        console.log("------------------------"); // this should log now
        cb(null, chunk);
      })
    )
    .pipe(gulp.dest("./single-dist"));
});
