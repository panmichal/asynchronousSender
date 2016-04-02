class AsynchronousGetSender {
  constructor(table, url, type='json') {
    this.table = table;
    this.url = url;
    this.type = type;
  }

  send() {
    const chunkPromise = (index=0) => {
      if(index >= this.table.length)
        return $.Deferred().resolve().promise();
      else {
        return $
          .ajax({
              type: 'post',
              url: this.url,
              dataType: self.type,
              data:{
                  data: this.table[index++]
              }
          })
          .then(() => chunkPromise(index));
      }
    };
    chunkPromise()
      .then(() => {
        console.log('WYSLANO!');
      })
      .fail(console.log.bind(console));
  }
};
$(() => {
  (new AsynchronousGetSender([
      {"Song Author": "Snoop Dogg", "Title": "So Many Pros"},
      {"Song Author": "Disturbed", "Title": "The Light"}
  ], 'dataAnalyzer/')).send();
});
