/*import React, { Component } from 'react'
import axios from 'axios'
import InputComponent from 'component/input-component'
import SelectComponent from 'component/select-component'
import ListItemComponent from 'component/list-item-component'
import VignetteComponent from 'component/vignette-component'
import ConnectionPopUp from '../container/connection-container'

import '../css/test.css'
import ProfilDemandePettSitter from './profil-demande-pettsitter'

class RecherchePetsitter extends Component {
    constructor (props) {
        super(props)
        // question a poser a nassim voir les criteres comme il sont dans le request ????
        this.state = {
            garderChezPetsitter: 0,
            garderChezVous: 0,
            promenade: 0,
            numero_rue: '',
            nom_rue: '',
            code_postal: '',
            ville: 'toto',
            pays: '',
            dateDebut: '',
            dateFin: '',
            typeAnimal: '',
            infolettre: '',

            resultatRecherche: false,
            rechercher: false,
            infosRecherche: [],
            username: '',
            recherche: false,
            resultat: [],
            province: '',
            servicesTotal: []
            // idUser: false
        }

        this.handleAddOnClick = this.handleAddOnClick.bind(this)
        this.handleSaveOnClick = this.handleSaveOnClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        // this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAfficherSitterOnClick = this.handleAfficherSitterOnClick.bind(this)
        this.handleEnvoyerDemandeOnClick = this.handleEnvoyerDemandeOnClick.bind(this)
    }

    componentDidMount () {
        return axios
            .get('https://pets-friendly.herokuapp.com/services/recuperation/tout')
        // .then(response => console.log(response.data))
            .then(response => {
                const service = []
                response.data.map((info, index) => service.push(info))
                console.log('services', service)
                localStorage.setItem('servicestotal', JSON.stringify(service))
                this.setState({ servicesTotal: service })
            // event.preventDefault()
            })
            .catch(err => {
                console.log('erreur recherche:', err)
            })
    }

    handleChangeSelect (event) {
        this.setState({ typeAnimal: event.target.value })
    }

    handleChange (event) {
        switch (event.target.id) {
        case 'garderChezPetsitter':

            this.setState({ garderChezPetsitter: 1 })
            break
        case 'garderChezVous':

            this.setState({ garderChezVous: 2 })
            break
        case 'dateDebut':
            this.setState({ dateDebut: event.target.value })
            break
        case 'dateFin':
            this.setState({ dateFin: event.target.value })
            break
        case 'promenade':
            this.setState({ promenade: 3 })
            break
        case 'numeroRue':
            this.setState({ numero_rue: event.target.value })
            break
        case 'nomRue':
            this.setState({ nom_rue: event.target.value })
            break
        case 'secteurAction':
            this.setState({ code_postal: event.target.value })
            break
        case 'province':
            this.setState({ province: event.target.value })
            break
        case 'ville':
            this.setState({ ville: event.target.value })
            break
        case 'pays':
            this.setState({ pays: event.target.value })
            break
        case 'infolettre':
            this.setState({ infolettre: event.target.value })
        }
    }

    handleSubmit (event) {
        if (localStorage.getItem('usertoken').nom != null) {
            alert('recherche en cours')
            return axios
                .post('https://pets-friendly.herokuapp.com/recherche', {

                    services: [
                        4
                    ],
                    adresse: {
                        numero_rue: 1890,
                        nom_rue: 'parthenais',
                        code_postal: 'H2K 3S3',
                        ville: 'montreal',
                        pays: 'canada'
                    }

                })
                .then(response => {
                    const arrayTest = []
                    response.data.map((info, index) => arrayTest.push(info))
                    console.log(arrayTest)
                    this.setState({ resultat: arrayTest })
                })
                .catch(err => {
                    console.log('erreur recherche:', err)
                })
        } else {
            <ConnectionPopUp />
        }
                })
        }
    }

    handleAddOnClick () {
        this.setState({ resultatRecherche: true })
    }

    handleSaveOnClick () {
        this.setState({ resultatRecherche: false })
    }

    handleAfficherSitterOnClick (event) {
        console.log(this.state.resultat[event.target.name])
        localStorage.setItem('sitter', JSON.stringify(this.state.resultat[event.target.name]))
        // localStorage.removeItem('sitter')

        // console.log('local Storage:', JSON.parse(localStorage.getItem('sitter')))
    }

    handleEnvoyerDemandeOnClick (event) {

        localStorage.setItem('sitter', JSON.stringify(this.state.resultat[event.target.name]))
    }

    render () {
        const TYPEANIMAL = [
            {
                label: 'Chien',
                value: 'Chien '
            }, {
                label: 'Chat',
                value: 'Chat'
            }, {
                label: 'Autre',
                value: 'Autre'
            }]

        function niveauPetSitter (niveau) {
            let niveauSitter = ''
            if (niveau > 0 && niveau < 50) {
                niveauSitter = 'Debutant'
            } else if (niveau >= 50 && niveau < 100) {
                niveauSitter = 'Normal'
            } else if (niveau >= 100 && niveau < 200) {
                niveauSitter = 'Intermediare'
            } else if (niveau >= 200 && niveau < 400) {
                niveauSitter = 'Proffesionel'
            } else if (niveau >= 400) {
                niveauSitter = 'Expert'
            }
            return niveauSitter
        }
        console.log('recherche info : ', this.state.servicesTotal)
        console.log('state :', this.state.resultat)

        // voir les dates dans le formulaire a chaque fois il y a des erreus dans la console qui pointe le fait de ne pas avoir la bonne valeur date.now??
        return (
            <div>

                <div id='divPublicite'>
                    <div className='w-50 p-3 mx-auto bg-secondary text-white'>
                        <h1 className='h1'>Gagnez Temps et Tranquilite de d'esprit Recherchez ce qu'il vous faut on se occupe du reste </h1>
                    </div>
                </div>
                <h1 className='w-25 p-3 mx-auto'>Recherche Petsitter</h1>
                <div className='w-50 p-3 mx-auto img-fluid img-thumbnail'>

                    <InputComponent classCss='form-check' classInput='form-form-check-input' labelClass='form-check-label' type='radio' textLabel='Garder Chez le PettSitter' id='garderChezPetsitter' name='gardeMaison' value={this.state.garderChezPetsitter} onChange={this.handleChange} />
                    <InputComponent classCss='form-check' classInput='form-form-check-input' labelClass='form-check-label' type='radio' textLabel='Garder chez vous' id='garderChezVous' name='gardeMaison' value={this.state.garderChezVous} onChange={this.handleChange} />
                    <InputComponent classCss='form-check' classInput='form-form-check-input' labelClass='form-check-label' type='checkbox' textLabel='Promenade' id='promenade' name='Promenade' value={this.state.promenade} onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='Date de debut' type='date' id='dateDebut' name='dateDebut' onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='Date de fin' type='date' id='dateFin' name='dateFin' onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='Numero' type='number' id='numeroRue' name='numero' min={0} onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='Nom de la rue' type='text' id='nomRue' name='nom de la rue' onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='Code postal' type='text' id='secteurAction' name='secteurAction' onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='Ville' type='text' id='ville' name='ville' onChange={this.handleChange} />
                    <InputComponent classCss='form-group' classInput='form-control' textLabel='pays' type='text' id='pays' name='pays' onChange={this.handleChange} />
                    <SelectComponent classCss='form-group' classInput='form-control' textLabel='Type de animal:' id='typeAnimal' name='TypeAnimal' options={TYPEANIMAL} onChange={this.handleChangeSelect} value={this.state.typeAnimal} />
                    <InputComponent classInput='btn btn-outline-success' type='submit' id='rechercher' name='Rechercher ' value='rechercher' onClick={this.handleSubmit} />
                </div>
                {this.state.idUser ? <ProfilDemandePettSitter idSitter={this.state.idUser} /> : ''}
                <div className='row'>
                    {this.state.resultat ? this.state.resultat.map((resultat, index) => <VignetteComponent urlPhoto={resultat.url_photo} nom={resultat.nom} rating={niveauPetSitter(resultat.rating)} className='col-lg-4 mt-3 ' key={index} onClickProfil={this.handleAfficherSitterOnClick} onClickEnvoyer={this.handleEnvoyerDemandeOnClick} classInput='fas fa-heart btn btn-outline-danger mx-auto' classInput2='fas fa-paper-plane btn btn-outline-success mx-auto' textBoutonProfil='Acceder au Profil' textBoutonEnvoyer='Envoyer une demande' servicesTotal={this.state.servicesTotal} servicesSitter={resultat.services} id={index} />) : ''}

                </div>

                <div id='divPlubicite2'>
                    <h1 className='w-50 p-3 mx-auto h1'>Des Services Sur mesure pour un Animal d'exeption </h1>
                    <div className='row divAnnonce'>
                        <div className='col-lg-4 mx-auto border border-danger rounded'>
                            <ListItemComponent text='Faite garder votre animal a votre domicile ou celui du Pett Sitter' className='fas fa-check' />
                            <ListItemComponent text='Partez a votre rendez vous sans vous soucier de la promenade de votre chien' className='fas fa-check' />
                            <ListItemComponent text='Besoin de flexibilite? Choisisez les horraires et periodes qui vous conviennent' className='fas fa-check' />
                        </div>
                        <div className='col-lg-4 mx-auto border border-danger rounded'>
                            {/* METTRE UN ICONE DANS LAVANT DE LES LI POUR LA PUBLICITER */}
                        /*    <ListItemComponent text='Tout les nouveaux gardiens passent une verification des antecedents de base' className='fas fa-check' />
                            <ListItemComponent text='Tout les gardiens fournissent un profil detaille et des informations personnel ' className='fas fa-check' />
                            <ListItemComponent text='tout les Pet Sitter sont agrees par notre equipe de specialistes chez Pets Friendly' className='fas fa-check' />
                        </div>
                    </div>
                </div>
                <div className='infolettreDiv mt-3'>
                    <h1 className='h1'>Laisse nous vous prevenir des nouveautes</h1>
                    <h6 className='h6'>Reste informe</h6>
                    <form>
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Entrez votre email' type='email' id='infolettre' name='infolettre' onChange={this.handleChange} />
                        <InputComponent classInput='btn btn-outline-danger' type='submit' id='infolettreButton' name='Envoyer ' value='Envoyer' />
                    </form>
                </div>
            </div>
        )
    }
}

export default RecherchePetsitter
