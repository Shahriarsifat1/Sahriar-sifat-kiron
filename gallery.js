function openModal(src, caption) {
            const modal = document.getElementById('myModal');
            const modalImage = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            
            modalImage.src = src;
            modalCaption.textContent = caption;
            modal.style.display = 'flex';
        }

        function closeModal() {
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';
        }