function track() {
  const reports = [];
  let content;

  function createElement(tag, text, classV) {
    let element = document.createElement(tag);
    if (text) {
      element.textContent = text;
    }
    if (classV) {
      element.classList.add(classV);
    }

    return element;
  }

  function appendReport() {
    content.innerHTML = "";
    for (let report of reports) {
      let reportDiv = createElement("div", undefined, "report");
      reportDiv.id = `report_${report.ID}`;
      let bodyDiv = createElement("div", undefined, "body");
      bodyDiv.appendChild(createElement("p", report.description));
      let titleDiv = createElement("div", undefined, "title");
      titleDiv.appendChild(createElement("span", `Submitted by: ${report.author}`, "author"));
      titleDiv.appendChild(
        createElement("span", `${report.status} | ${report.severity}`, "status")
      );
      reportDiv.appendChild(bodyDiv);
      reportDiv.appendChild(titleDiv);
      content.appendChild(reportDiv);
    }
  }

  return {
    report: function(author, description, reproducible, severity) {
      reports.push({
        ID: reports.length,
        author,
        description,
        reproducible,
        severity,
        status: "Open"
      });

      appendReport();
    },
    setStatus: function(id, status) {
      reports.find((x) => x.ID === id).status = status;
      appendReport();
    },
    remove: function(id) {
      reports.splice(reports.indexOf(reports.find((x) => x.ID === id)), 1);
      appendReport();
    },
    sort: function(method) {
      reports.sort(function(a, b) {
        if (isNaN(a[method])) {
          return a[method].localeCompare(b[method]);
        }

        return a[method] - b[method];
      });

      appendReport();
    },
    output: function(selector) {
      content = document.querySelector(selector);
    }
  };
}

let tracker = track();
// tracker.output("#content");
// tracker.report("kiwi", "judge rip", true, 5);

//tracker.output("#content");
// tracker.report("guy", "report content", true, 5);
// tracker.report("second guy", "report content 2", true, 3);
// tracker.report("abv", "report content three", true, 4);
// tracker.sort("severity");

//tracker.output("#content");
tracker.report("guy", "report content", true, 5);
tracker.report("second guy", "report content 2", true, 3);
tracker.report("abv", "report content three", true, 4);
tracker.remove(1);
