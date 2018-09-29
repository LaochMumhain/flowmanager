// Copyright (c) 2018 Maen Artimy
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Adapted from : http://javascriptbook.com

var compare = {                           // Declare compare object
  number: function(a, b) {                  // Add a method called name
    a = Number(a);
    b = Number(b);
    return a - b;
  },
  alphanum: function(a, b) {                  // Add a method called name
    if (a < b) {                          // If value a is less than value b
      return -1;                          // Return -1
    } else {                              // Otherwise
      return a > b ? 1 : 0;               // If a is greater than b return 1 OR
    }                                     // if they are the same return 0
  },
  duration: function(a, b) {              // Add a method called duration
    a = a.split(':');                     // Split the time at the colon
    b = b.split(':');                     // Split the time at the colon

    a = Number(a[0]) * 60 + Number(a[1]); // Convert the time to seconds
    b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds

    return a - b;                         // Return a minus b
  },
  date: function(a, b) {                  // Add a method called date
    a = new Date(a);                      // New Date object to hold the date
    b = new Date(b);                      // New Date object to hold the date

    return a - b;                         // Return a minus b
  }
};

$('body').on('click', '.sortable th', function(e) {
  var $header = $(this);                  // Get the header
  var order = $header.data('sort');       // Get value of data-sort attribute
  var column;                             // Declare variable called column
  var $table = $header.parents('table');
  var $tbody = $table.find('tbody');        // Store table body
  var $controls = $table.find('th');        // Store table headers
  var rows = $tbody.find('tr').toArray();   // Store array containing rows

  // If selected item has ascending or descending class, reverse contents
  if ($header.is('.ascending') || $header.is('.descending')) {
    $header.toggleClass('ascending descending');    // Toggle to other class
    $tbody.append(rows.reverse());                // Reverse the array
  } else {                                        // Otherwise perform a sort
    $header.addClass('ascending');                // Add class to header
    // Remove asc or desc from all other headers
    $header.siblings().removeClass('ascending descending');
    if (compare.hasOwnProperty(order)) {  // If compare object has method
      column = $controls.index(this);     // Search for column's index no

      rows.sort(function(a, b) {               // Call sort() on rows array
        a = $(a).find('td').eq(column).text(); // Get text of column in row a
        b = $(b).find('td').eq(column).text(); // Get text of column in row b
        return compare[order](a, b);           // Call compare method
      });

      $tbody.append(rows);
    }
  }
});
