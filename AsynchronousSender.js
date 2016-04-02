class AsynchronousGetSender {
  constructor(table, url, type='json') {
    this.table = table;
    this.url = url;
    this.type = type;
  }

  send() {
    const promises = this.table.map(chunk => {
      $.ajax({
        type: 'post',
        url: this.url,
        dataType: self.type,
        data:{
            data: chunk
        }
      })
    });

    promises.reduce((chain, promise) => {
      return chain.then(promise);
    }, $.Deferred().resolve())
    .then(() => {
      console.log("SUCCESS!");
    })
    .fail(console.log.bind(console))
  }
};
$(() => {
  (new AsynchronousGetSender([
      {"Song Author": "Snoop Dogg", "Title": "So Many Pros"},
      {"Song Author": "Disturbed", "Title": "The Light"}
  ], 'dataAnalyzer/')).send();
});
