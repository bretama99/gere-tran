const Listenseignes = {
    name: "Listenseignes",
    data() {
        return {
            currentList: null,
        }
    },
    methods: {
        enseignesToResta(e) {
            this.currentList = true;
            return this.$emit('enseignes_to_resta', this.currentList);
        }
    },
    props: ['enseignes_list'],
    template:
    `
    <div id="ap" class="position-relative col-11 mx-auto">
        <div class="bckg-list-resta card mb-2 d-flex position-relative">
            <div class="card-header bg-transparent p-0 position-relative mx-0 z-index-2">
                <div class="position-relative multisteps-form__progress  border">
                    <button id="btn-enseigne"
                        class="d-flex justify-content-center align-items-center btn m-auto icone-resta-enseigne"
                        type="button" title="User Info">
                        <span class="d-flex">
                            <picture class="d-flex bg-gradient-my-red rounded p-1">
                                <img src="../assets/img/couvercles-light.png"
                                    class="d-flex img-icone-resta-enseigne"
                                    alt="icone-enseigne">
                            </picture>
                        </span>
                    </button>
                </div>
            </div>

            <div>
                <div class="card-body px-0">
                    <div class="container-xl">
                        <div class="table-responsive m-0">
                            <div class="table-wrapper">

                                <table class="table-resta">
                                    <thead>
                                        <tr class="text-dark">
                                            <th>#</th>
                                            <td></td>
                                            <th>Enseigne </th>
                                            <th>Type de restaurant</th>
                                            <th class="nbr-resta-enseigne">Nombre
                                                d'établissements </th>
                                            <th>Site internet</th>
                                            <th>Actions</th>
                                        </tr>

                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <picture class="canevas">
                                                    <img src="../assets/img/tacos-logo.png"
                                                        id="" class="icone-canevas"
                                                        alt="couvercles">
                                                </picture>
                                            </td>
                                            <td>Tacos</td>
                                            <td>tacos bar</td>
                                            <td class="nbr-resta-enseigne">10</td>
                                            <td>tacos.com</td>
                                            <td>
                                                <a href="./../View/restaurants-list.html"
                                                    class="d-inline-block nav-link text-white m-0"
                                                    role="button">
                                                    <img src="../assets/img/couvercles.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img"
                                                        alt="couvercles">
                                                </a>
                                                <a href=""
                                                    class="d-inline-block nav-link text-white m-1"
                                                    role="button">
                                                    <img src="../assets/img/update.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img bg-success rounded"
                                                        alt="couvercles">
                                                </a>
                                                <a href=""
                                                    class="d-inline-block nav-link text-white m-0"
                                                    role="button">
                                                    <img src="../assets/img/delete.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img bg-danger rounded"
                                                        alt="couvercles">
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <picture class="canevas">
                                                    <img src="../assets/img/tacos-logo.png"
                                                        id="" class="icone-canevas"
                                                        alt="couvercles">
                                                </picture>
                                            </td>
                                            <td>Friteria</td>
                                            <td>friterie</td>
                                            <td class="nbr-resta-enseigne">4</td>
                                            <td>friteria.com</td>
                                            <td>
                                                <a href="./../View/restaurants-list.html"
                                                    class="d-inline-block nav-link text-white m-0"
                                                    role="button">
                                                    <img src="../assets/img/couvercles.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img"
                                                        alt="couvercles">
                                                </a>
                                                <a href=""
                                                    class="d-inline-block nav-link text-white m-1"
                                                    role="button">
                                                    <img src="../assets/img/update.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img bg-success rounded"
                                                        alt="couvercles">
                                                </a>
                                                <a href=""
                                                    class="d-inline-block nav-link text-white m-0"
                                                    role="button">
                                                    <img src="../assets/img/delete.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img bg-danger rounded"
                                                        alt="couvercles">
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>
                                                <picture class="canevas">
                                                    <img src="../assets/img/tacos-logo.png"
                                                        id="" class="icone-canevas"
                                                        alt="couvercles">
                                                </picture>
                                            </td>
                                            <td>Bufallo grill</td>
                                            <td>restaurant grill</td>
                                            <td class="nbr-resta-enseigne">3</td>
                                            <td>restaurant grill.com</td>
                                            <td>
                                                <a @click.prevent="enseignesToResta" href="">
                                                    <img src="../assets/img/couvercles.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img"
                                                        alt="couvercles">
                                                </a>
                                                <a href=""
                                                    class="d-inline-block nav-link text-white m-1"
                                                    role="button">
                                                    <img src="../assets/img/update.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img bg-success rounded"
                                                        alt="couvercles">
                                                </a>
                                                <a href=""
                                                    class="d-inline-block nav-link text-white m-0"
                                                    role="button">
                                                    <img src="../assets/img/delete.png"
                                                        height="20" id=""
                                                        class="navbar-brand-img bg-danger rounded"
                                                        alt="couvercles">
                                                </a>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="clearfix mt-3">
                                    <div class="hint-text">Showing <b>5</b> out of
                                        <b>25</b> entries</div>
                                    <ul
                                        class="d-flex justify-content-center align-items-center pagination">
                                        <li class="d-flex pagin-left"><small
                                                class="page-link border-0 rounded p-2 extra-small"><i
                                                    class="fa fa-angle-double-left
                                                    pagin-left extra-small"></i></small>
                                        </li>
                                        <li class="d-flex"><small><a href="#"
                                                    class="page-link extra-small">1</a></small>
                                        </li>
                                        <li class="d-flex"><small><a href="#"
                                                    class="page-link extra-small">2</a></small>
                                        </li>
                                        <li class="d-flex active"><small><a href="#" class="page-link
                                                    extra-small">3</a></small></li>
                                        <li class="d-flex"><small><a href="#" class="page-link
                                                    extra-small">4</a></small></li>
                                        <li class="d-flex"><small><a href="#" class="page-link
                                                    extra-small">5</a></small></li>
                                        <li class="d-flex pagin-right">
                                            <small
                                                class="page-link border-0 rounded p-2 extra-small"><i
                                                    class="fa fa-angle-double-right
                                                    pagin-right extra-small"></i></small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}


const Listrestaurants = {
    name: "listrestaurants",
    data() {
        return {
            currentList: null
        }
    },
    methods: {
        restaToEnseignes(e) {
            this.currentList = false;
            return this.$emit('resta_to_enseignes', this.currentList);
        }
    },
    props: ["restaurants_list"],
    template:
        `
        <div class="position-relative col-12 mx-auto">
            <div class="bckg-list-resta card mb-2 d-flex position-relative">
                <div class="card-header bg-transparent p-0 position-relative mx-0 z-index-2">
                    <div class="position-relative multisteps-form__progress  border">
                        <button id="btn-enseigne"
                            class="d-flex justify-content-center align-items-center btn m-auto icone-resta-enseigne"
                            type="button" title="User Info">
                            <span class="d-flex">
                                <picture class="d-flex bg-gradient-my-red rounded p-1">
                                    <img src="../assets/img/couvercles-light.png"
                                        class="d-flex img-icone-resta-enseigne"
                                        alt="icone-enseigne">
                                </picture>
                            </span>
                        </button>
                    </div>
                </div>


                <div>
                    <div class="card-body px-0">
                        <div class="container-xl">
                            <div class="table-responsive m-0">
                                <div class="table-resta-wrapper">

                                    <table class="table-resta">
                                        <thead>
                                            <tr class="text-dark">
                                                <th>#</th>
                                                <th> </th>
                                                <th>Restaurant </th>
                                                <th>Adresse</th>
                                                <th>Siret </th>
                                                <th>Horaire</th>
                                                <th>Contact</th>
                                                <th>Clé de license</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <picture class="canevas">
                                                        <img src="../assets/img/tacos-logo.png"
                                                            id="" class="icone-canevas"
                                                            alt="couvercles">
                                                    </picture>
                                                </td>
                                                <td>Tacos</td>
                                                <td>Paris</td>
                                                <td>31109996774561</td>
                                                <td>
                                                    <ul>
                                                        <li>10h-12h</li>
                                                        <li>18h-22h</li>
                                                    </ul>
                                                </td>
                                                <td>mr perronne</td>
                                                <td>GGTTT6#*KKK</td>
                                                <td>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-0"
                                                        role="button">
                                                        <img src="../assets/img/couvercles.png"
                                                            height="20" id=""
                                                            class="navbar-brand-img"
                                                            alt="couvercles">
                                                    </a>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-1"
                                                        role="button">
                                                        <img src="../assets/img/update.png"
                                                            height="20" id=""
                                                            class="navbar-brand-img bg-success rounded"
                                                            alt="couvercles">
                                                    </a>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-0"
                                                        role="button">
                                                        <img src="../assets/img/delete.png"
                                                            height="20" id="" class="navbar-brand-img bg-danger
                                                            rounded" alt="couvercles">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <picture class="canevas">
                                                        <img src="../assets/img/tacos-logo.png"
                                                            id="" class="icone-canevas"
                                                            alt="couvercles">
                                                    </picture>
                                                </td>
                                                <td>Friteria</td>
                                                <td>Lille</td>
                                                <td>28939997987655</td>
                                                <td>8h-22h</td>
                                                <td>
                                                    <ul>
                                                        <li>mr albert</li>
                                                        <li>mr cousin</li>
                                                        <li>mr mouzin</li>
                                                    </ul>
                                                </td>
                                                <td>3JJUJ777#HH</td>
                                                <td>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-0"
                                                        role="button">
                                                        <img src="../assets/img/couvercles.png"
                                                            height="20" id=""
                                                            class="navbar-brand-img"
                                                            alt="couvercles">
                                                    </a>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-1"
                                                        role="button">
                                                        <img src="../assets/img/update.png"
                                                            height="20" id=""
                                                            class="navbar-brand-img bg-success rounded"
                                                            alt="couvercles">
                                                    </a>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-0"
                                                        role="button">
                                                        <img src="../assets/img/delete.png"
                                                            height="20" id="" class="navbar-brand-img bg-danger
                                                            rounded" alt="couvercles">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <picture class="canevas">
                                                        <img src="../assets/img/tacos-logo.png"
                                                            id="" class="icone-canevas"
                                                            alt="couvercles">
                                                    </picture>
                                                </td>
                                                <td>Bufallo grill</td>
                                                <td>Place du village
                                                    fleuri
                                                    immeuble 2
                                                    appartement 212 59600 Maubeuge
                                                </td>
                                                <td>42999098760022</td>
                                                <td>8h-16h</td>
                                                <td>mr mounir</td>
                                                <td>3K9O00#GGTR</td>
                                                <td>
                                                    <a @click.prevent="restaToEnseignes" href="">
                                                        <img src="../assets/img/couvercles.png"
                                                            height="20" id=""
                                                            class="navbar-brand-img"
                                                            alt="couvercles">
                                                    </a>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-1"
                                                        role="button">
                                                        <img src="../assets/img/update.png"
                                                            height="20" id=""
                                                            class="navbar-brand-img bg-success rounded"
                                                            alt="couvercles">
                                                    </a>
                                                    <a href=""
                                                        class="d-inline-block nav-link text-white m-0"
                                                        role="button">
                                                        <img src="../assets/img/delete.png"
                                                            height="20" id="" class="navbar-brand-img bg-danger
                                                            rounded" alt="couvercles">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="clearfix mt-3">
                                        <div class="hint-text">Showing <b>5</b> out of<b>25</b> entries</div>
                                        <ul
                                            class="d-flex justify-content-center align-items-center pagination">
                                            <li class="d-flex pagin-left"><small
                                                    class="page-link border-0 rounded p-2 extra-small"><i
                                                        class="fa fa-angle-double-left
                                                        pagin-left extra-small"></i></small>
                                            </li>
                                            <li class="d-flex"><small><a href="#"
                                                        class="page-link extra-small">1</a></small>
                                            </li>
                                            <li class="d-flex"><small><a href="#"
                                                        class="page-link extra-small">2</a></small>
                                            </li>
                                            <li class="d-flex active"><small><a href="#" class="page-link
                                                        extra-small">3</a></small></li>
                                            <li class="d-flex"><small><a href="#" class="page-link
                                                        extra-small">4</a></small></li>
                                            <li class="d-flex"><small><a href="#" class="page-link
                                                        extra-small">5</a></small></li>
                                            <li class="d-flex pagin-right">
                                                <small
                                                    class="page-link border-0 rounded p-2 extra-small"><i
                                                        class="fa fa-angle-double-right
                                                        pagin-right extra-small"></i></small>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `
}

const routes = [
    { path: "/", component: Listenseignes, name: "Listenseignes", props: true, linkActiveClass: 'active' },
    { path: "/list_restaurants", component: Listrestaurants, name: "Listrestaurants", props: true, linkActiveClass: 'active' }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});

const app = Vue.createApp({
    name: "app",
    data() {
        return {
            currentList: null,
        }
    },
    methods: {
        enseignesOrResta(data) {
            (data === false ? this.currentList = data : this.currentList = true);
        }
    },
    props: ["value"],
    components: {
        Listenseignes: Listenseignes,
        Listrestaurants: Listrestaurants
    },
    router: router
});

app.use(router);
app.mount("#app");

