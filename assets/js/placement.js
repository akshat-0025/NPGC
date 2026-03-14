
        /* ── COMMITTEE DATA ── */
        const members = [
            {no:1,  name:"Nishant Bajaj",        prog:"B.Com. (Hons.)", dept:"core",   lbl:"Core Leadership"},
            {no:2,  name:"Abdul Azeem Khan",      prog:"B.B.A.",         dept:"core",   lbl:"Core Leadership"},
            {no:3,  name:"Rudraksh Pandey",       prog:"B.Sc.",          dept:"core",   lbl:"Core Leadership"},
            {no:4,  name:"Rishi Verma",           prog:"B.Com. (Hons.)", dept:"social", lbl:"Social Media"},
            {no:5,  name:"Sarthak Kesarwani",     prog:"B.Com. (Hons.)", dept:"social", lbl:"Social Media"},
            {no:6,  name:"Kirti Agarwal",         prog:"B.C.A.",         dept:"social", lbl:"Social Media"},
            {no:7,  name:"Kriti Upadhyay",        prog:"B.C.A.",         dept:"social", lbl:"Social Media"},
            {no:8,  name:"Saurabh Bhatt",         prog:"B.B.A.",         dept:"intern", lbl:"Internship"},
            {no:9,  name:"Shreyansh Srivastava",  prog:"B.Sc.",          dept:"intern", lbl:"Internship"},
            {no:10, name:"Aditi Srivastava",      prog:"B.C.A.",         dept:"intern", lbl:"Internship"},
            {no:11, name:"Anushka Rastogi",       prog:"B.B.A.",         dept:"intern", lbl:"Internship"},
            {no:12, name:"Abhiram Srivastava",    prog:"B.Com.",         dept:"tp",     lbl:"T & P"},
            {no:13, name:"Amit Kumar Srivastava", prog:"B.Com.",         dept:"tp",     lbl:"T & P"},
            {no:14, name:"Pushpesh Srivastava",   prog:"B.C.A.",         dept:"tp",     lbl:"T & P"},
            {no:15, name:"Sakshi Singh",          prog:"B.Voc. (B&F)",   dept:"tp",     lbl:"T & P"},
            {no:16, name:"Ashu Verma",            prog:"B.B.A.",         dept:"alumni", lbl:"Alumni Relations"},
            {no:17, name:"Eshita Awasthi",        prog:"B.C.A.",         dept:"alumni", lbl:"Alumni Relations"},
            {no:18, name:"Nivedita Shukla",       prog:"B.Com. (Hons.)", dept:"alumni", lbl:"Alumni Relations"},
            {no:19, name:"Sanjhri Mehrotra",      prog:"B.B.A.",         dept:"alumni", lbl:"Alumni Relations"},
        ];
        const roleMap = {core:'rc', social:'rs', intern:'ri', tp:'rt', alumni:'ra'};
        const filters = [
            {k:'all',    t:'All Members'},
            {k:'core',   t:'Core'},
            {k:'social', t:'Social Media'},
            {k:'intern', t:'Internship'},
            {k:'tp',     t:'Training & Placement'},
            {k:'alumni', t:'Alumni'},
        ];

        const filterRow = document.getElementById('filterRow');
        filters.forEach(f => {
            const b = document.createElement('button');
            b.className = 'fb' + (f.k === 'all' ? ' on' : '');
            b.dataset.k = f.k; b.textContent = f.t;
            filterRow.appendChild(b);
        });

        function render(key) {
            const rows = key === 'all' ? members : members.filter(m => m.dept === key);
            document.getElementById('tbody').innerHTML = rows.map(m => `
                <tr>
                    <td class="td-sno">${m.no}</td>
                    <td class="td-nm">${m.name}</td>
                    <td><span class="bp">${m.prog}</span></td>
                    <td><span class="br ${roleMap[m.dept]}">${m.lbl}</span></td>
                </tr>`).join('');
        }
        render('all');

        filterRow.addEventListener('click', e => {
            const b = e.target.closest('.fb');
            if (!b) return;
            document.querySelectorAll('.fb').forEach(x => x.classList.remove('on'));
            b.classList.add('on');
            render(b.dataset.k);
        });

        /* ── MARQUEE ── */
        const companies = [
            "Deloitte","HDFC Bank","ICICI Bank","Axis Bank","Wipro","Infosys","TCS",
            "HCL Technologies","Cognizant","Tech Mahindra","Bajaj Finserv","KPMG",
            "PwC","EY","Reliance Industries","Aditya Birla Group","Jio","Airtel","Paytm","Zomato"
        ];
        const track = document.getElementById('mqTrack');
        track.innerHTML = [...companies, ...companies]
            .map(c => `<div class="rchip"><i class="fa-solid fa-circle"></i>${c}</div>`).join('');

        /* ── SCROLL REVEAL ── */
        const obs = new IntersectionObserver(es => {
            es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
        }, { threshold: 0.10 });
        document.querySelectorAll('.rv').forEach(el => obs.observe(el));