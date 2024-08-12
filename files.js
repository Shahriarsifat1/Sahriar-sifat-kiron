// Firebase configuration
       var firebaseConfig = {
           apiKey: "AIzaSyDKOz-sBiEJmre0eyIr2qnVGoEcZFyLTaY",
           authDomain: "photography-4ded6.firebaseapp.com",
           databaseURL: "https://photography-4ded6-default-rtdb.firebaseio.com",
           projectId: "photography-4ded6",
           storageBucket: "photography-4ded6.appspot.com",
           messagingSenderId: "18693535056",
           appId: "1:18693535056:web:66ac3aea0cae7826a5a855",
           measurementId: "G-GTNV78717R"
       };
       // Initialize Firebase
       firebase.initializeApp(firebaseConfig);

       function loadFiles() {
           const fileList = document.getElementById("fileList");
           fileList.innerHTML = "";
           document.getElementById("loadingSpinner").style.display = 'block';

           firebase.database().ref('files').on('value', (snapshot) => {
               document.getElementById("loadingSpinner").style.display = 'none';
               snapshot.forEach((childSnapshot) => {
                   const file = childSnapshot.val();
                   const li = document.createElement('li');

                   // File icon
                   const icon = document.createElement('i');
                   icon.classList.add('fas');
                   icon.classList.add(getFileIcon(file.name));
                   icon.classList.add('file-icon');
                   li.appendChild(icon);

                   // File name
                   const name = document.createElement('span');
                   name.className = "file-name";
                   name.textContent = file.name;
                   li.appendChild(name);

                   // Fetch file size from Firebase Storage
                   firebase.storage().refFromURL(file.url).getMetadata().then((metadata) => {
                       const size = document.createElement('span');
                       size.className = "file-size";
                       size.textContent = formatFileSize(metadata.size);
                       li.appendChild(size);
                   }).catch((error) => {
                       console.error("Error fetching file size:", error);
                       const size = document.createElement('span');
                       size.className = "file-size";
                       size.textContent = "Unknown size";
                       li.appendChild(size);
                   });

                   // Download button
                   const downloadBtn = document.createElement('button');
                   downloadBtn.className = "download-btn";
                   downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
                   downloadBtn.addEventListener('click', () => downloadFile(file));
                   li.appendChild(downloadBtn);

                   fileList.appendChild(li);
               });
           });
       }

       function getFileIcon(fileName) {
           const ext = fileName.split('.').pop().toLowerCase();
           switch (ext) {
               case 'pdf': return 'fa-file-pdf';
               case 'jpg':
               case 'jpeg':
               case 'png': return 'fa-file-image';
               case 'zip':
               case 'rar': return 'fa-file-archive';
               case 'doc':
               case 'docx': return 'fa-file-word';
               case 'xls':
               case 'xlsx': return 'fa-file-excel';
               default: return 'fa-file';
           }
       }

       function formatFileSize(bytes) {
           const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
           if (bytes === 0) return '0 Byte';
           const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
           return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
       }

       function downloadFile(file) {
       // Create an invisible link element for downloading
       const link = document.createElement('a');
       link.href = file.url;
       link.download = file.name;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       }
       
       document.getElementById("searchBar").addEventListener("input", function () {
       const filter = this.value.toLowerCase();
       const files = document.querySelectorAll('#fileList li');
       files.forEach(file => {
       const fileName = file.querySelector('.file-name').textContent.toLowerCase();
       if (fileName.includes(filter)) {
       file.style.display = '';
       } else {
       file.style.display = 'none';
       }
       });
       });
       
       document.addEventListener("DOMContentLoaded", loadFiles);
       
