# AsynchronousSender

Simple Javascript script sending arrayed data asynchronously one by one. All what is required is jQuery >= 1.10.2. No Node.js, no frameworks, no fancy-magic scripts are needed.

### Abstract
From time to time we need to iterate over array values and send them in defined order into backend, process data, save the data and get the status.

The problem is that JavaScript and jQuery send data synchronously. While we want to send all data asynchronously from array or table, jQuery offers methods like $.while, $.Deffered or $.Promise, which sometime don't works as we expected - all datas are sent asynchronously, but responses come back not in proper orders as they'd been sent.

AsynchronousSender is easy to use and modify in your own way.

### How to use
Just put script into your HTML
```
    <script src="asynchronousSender.js"></script>
```

and create in other Javascript file an instance of AsynchronousSender with apriopriate parameters.
* table - put your table with (JSONified or not) data here to send
* pageAdress - url to the adress where you want to send each value in table.
```
    var async = new AsynchronousSender(table, "pageAdress");
```
and start sending with:
```
    async.SendData();
```

### How it works
AsynchronousSender gets your table length and calls jQuery Ajax request and send first data. When server responses to complete callback, AsynchronousSender increases iteratior and call self again for next data in table recursively till the end.

### How to modify for your own purposes
If you want to set own url in the hardcoded way or change type from the JSON to e.x the XML format, just change those two lines:
```
    this.url = url;
    this.type = "json";
```

If you want to perform some actions after every response from the server, modify this:
```
this.DuringAction = function(){
    console.log("Response number: "+self.iteration);
}
```

If you want to perform some actions at the end, modify body of FinishedAction method:

```
this.FinishedAction(){
      console.log("Finished all!");
}
```

### Usage examples
For default settings, we put table with JSONified data and send them to server:

```
    var data = [
        {"Song Author": "Snoop Dogg", "Title", "So Many Pros"},
        {"Song Author": "Disturbed", "Title": "The Light"}
    ];
    var async = new AsynchronousGetSender(data, "dataAnalyzer/");
    async.SendData();
```

### Development
If you have ideas how to make this little piece of code more usable, let me know, suggestions are really welcome :)

### License
GNU GPL
