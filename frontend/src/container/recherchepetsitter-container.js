import React, { Component } from 'react'

import axios from 'axios'
import InputComponent from 'component/input-component'
import SelectComponent from 'component/select-component'
import ListItemComponent from 'component/list-item-component'
import VignetteComponent from 'component/vignette-component'
import ModalMessage from 'component/modal'

import { withRouter } from 'react-router-dom'

import '../css/recherche.css'

class RecherchePetsitter extends Component {
    constructor (props) {
        super(props)
        this.state = {
            servicesRechercher: [],

            numero_rue: '',
            nom_rue: '',
            code_postal: '',
            ville: '',
            pays: '',
            dateDebut: '',
            dateFin: '',
            typeAnimal: '',
            infolettre: '',

            resultatRecherche: true,
            infosRecherche: [],
            recherche: false,
            resultat: [],
            province: '',
            servicesTotal: [],
            showmodal: false,
            message: '',
            blurry: false,
            idblur: ''

        }

        this.handleAddOnClick = this.handleAddOnClick.bind(this)
        this.handleSaveOnClick = this.handleSaveOnClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAfficherSitterOnClick = this.handleAfficherSitterOnClick.bind(this)
        this.handleEnvoyerDemandeOnClick = this.handleEnvoyerDemandeOnClick.bind(this)
        this.showModal = this.showModal.bind(this)
        this.onHandleonCloseModal = this.onHandleonCloseModal.bind(this)
    }

    showModal () {
        this.setState({ showmodal: true })
    };

    onHandleonCloseModal () {
        this.setState({ showmodal: false })
    };

    componentDidMount () {
        return axios
            .get('https://pets-friendly.herokuapp.com/services/recuperation/tout')
            .then(response => {
                const service = []
                response.data.map((info, index) => service.push(info))
                console.log('services', service)
                localStorage.setItem('servicestotal', JSON.stringify(service))
                this.setState({ servicesTotal: service })
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
            this.state.servicesRechercher[0] = 1
            break
        case 'garderChezVous':
            this.state.servicesRechercher[0] = 2
            break
        case 'dateDebut':
            this.setState({ dateDebut: event.target.value })
            break
        case 'dateFin':
            this.setState({ dateFin: event.target.value })
            break
        case 'promenade':
            if (this.state.servicesRechercher[1] === 3) {
                this.state.servicesRechercher.splice(1, 1)
            } else { this.state.servicesRechercher[1] = 3 }

            break
        case 'numeroRue':
            console.log(event.target.value)
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
        return axios
            .post('https://pets-friendly.herokuapp.com/recherche', {

                services: this.state.servicesRechercher,
                adresse: {
                    numero_rue: this.state.nom_rue,
                    nom_rue: this.state.nom_rue,
                    code_postal: this.state.code_postal,
                    ville: this.state.ville,
                    province: this.state.province,
                    pays: this.state.pays
                }

            })
            .then(response => {
                this.setState({ resultat: response.data })
            })
            .catch(err => {
                console.log('erreur recherche:', err)
            })
    }

    handleAddOnClick () {
        this.setState({ resultatRecherche: true })
    }

    handleSaveOnClick () {
        this.setState({ resultatRecherche: false })
    }

    handleAfficherSitterOnClick (event) {
        if (localStorage.getItem('usertoken') && JSON.parse(localStorage.getItem('usertoken')).utilisateur.id_role === 3) {
            this.state.message = 'Vous deves etre un proprietaire pour utiliser notres services de recherche '
            this.showModal()
        } else if (!localStorage.getItem('usertoken')) {
            this.state.message = 'Veuillez vous connecter ou inscrire pour continuer'
            console.log('dans le if non user')
            this.showModal()
        } else if (localStorage.getItem('usertoken') && JSON.parse(localStorage.getItem('usertoken')).utilisateur.id_role === 2) {
            console.log(this.state.resultat[event.target.name])
            console.log(this.state.dateDebut)
            console.log(this.state.dateFin)
            localStorage.setItem('serviceRecherche', JSON.stringify(this.state.servicesRechercher))
            localStorage.setItem('dateDebut', JSON.stringify(this.state.dateDebut))
            localStorage.setItem('dateFin', JSON.stringify(this.state.dateFin))
            localStorage.setItem('sitter', JSON.stringify(this.state.resultat[event.target.name]))

            this.props.history.push('/demande')
        }
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
        console.log('state :', this.state)
        console.log('codepostal', this.state.code_postal.length)
        return (

            <div>
                <div id={this.state.showmodal ? 'blury' : ''}>
                    <div id='divPublicite'>
                        <div className='greyboxdiv'>
                            <h1 className='h1'>Gagnez temps et tranquilité d'esprit. Recherchez ce qu'il vous faut, on s'occupe du reste! </h1>
                        </div>
                    </div>
                    <h1 className='w-25 p-3 mx-auto'>Recherche Petsitter</h1>
                    <div className='w-50 p-3 mx-auto img-fluid img-thumbnail'>

                        <InputComponent classCss='form-check' classInput='form-form-check-input' labelClass='form-check-label' type='radio' textLabel='Garder Chez le PetSitter' id='garderChezPetsitter' name='gardeMaison' value={this.state.garderChezPetsitter} onChange={this.handleChange} />
                        <InputComponent classCss='form-check' classInput='form-form-check-input' labelClass='form-check-label' type='radio' textLabel='Garder chez vous' id='garderChezVous' name='gardeMaison' value={this.state.garderChezVous} onChange={this.handleChange} />
                        <InputComponent classCss='form-check' classInput='form-form-check-input' labelClass='form-check-label' type='checkbox' textLabel='Promenade' id='promenade' name='Promenade' value={this.state.promenade} onChange={this.handleChange} />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Date de debut' type='date' id='dateDebut' name='dateDebut' onChange={this.handleChange} />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Date de fin' type='date' id='dateFin' name='dateFin' onChange={this.handleChange} />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Numero' type='number' id='numeroRue' name='numero' min={0} onChange={this.handleChange} placeHolder={1896} value={1896} />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Nom de la rue' type='text' id='nomRue' name='nom de la rue' onChange={this.handleChange} placeHolder='parthenais' value='parthenais' />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Code postal' type='text' id='secteurAction' name='secteurAction' onChange={this.handleChange} placeHolder='H2K 3S3' />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Ville' type='text' id='ville' name='ville' onChange={this.handleChange} placeHolder='Montreal' value='Montreal' />
                        <InputComponent classCss='form-group' classInput='form-control' textLabel='Province' type='text' id='province' name='province' onChange={this.handleChange} placeHolder='Quebec' value='Quebec' />

                        <InputComponent classCss='form-group' classInput='form-control' textLabel='pays' type='text' id='pays' name='pays' onChange={this.handleChange} placeHolder='Canada' value='Canada' />
                        <SelectComponent classCss='form-group' classInput='form-control' textLabel='Type de animal:' id='typeAnimal' name='TypeAnimal' options={TYPEANIMAL} onChange={this.handleChangeSelect} value={this.state.typeAnimal} />
                        <InputComponent classInput='btn btn-outline-success' type='submit' id='rechercher' name='Rechercher ' value='rechercher' onClick={this.handleSubmit} />
                    </div>

                    {this.state.resultatRecherche ? '' : <h1 className='text-danger'>Aucun sitter n'a été retrouvé selon vos critères. Veuillez changer vos critères de sélection ou nous contacter</h1>}
                    <div className='row'>
                        {this.state.resultat ? this.state.resultat.map((resultat, index) => {
                            if (resultat.url_photo === null && resultat.sexe === 'masculin') {
                                resultat.url_photo = 'image_profile_default_homme.jpg'
                            } else if (resultat.url_photo === null && resultat.sexe === 'feminin') {
                                resultat.url_photo = 'image_profile_default_femme.jpg'
                            }
                            return <VignetteComponent urlPhoto={resultat.url_photo} nom={resultat.nom} rating={niveauPetSitter(resultat.rating)} className='col-lg-4 mt-3 ' key={index} onClickProfil={this.handleAfficherSitterOnClick} onClickEnvoyer={this.handleEnvoyerDemandeOnClick} classInput='fas fa-heart btn btn-outline-danger w-100 p-3 mx-auto' classInput2='fas fa-paper-plane btn btn-outline-success mx-auto' textBoutonProfil='Acceder au Profil' textBoutonEnvoyer='Envoyer une demande' servicesTotal={this.state.servicesTotal} servicesSitter={this.state.servicesRechercher} id={index} link='/demande' />
                        }) : ''}

                    </div>

                    <div id='divPlubicite2'>
                        <h1 className='w-50 p-3 mx-auto h1'>Des services sur mesure pour un animal d'exeption </h1>
                        <div className='row divAnnonce'>
                            <div className='col-lg-4 mx-auto border border-danger rounded serviceProposes'>
                                <ListItemComponent text='Faites garder votre animal à votre domicile ou à celui du Pet Sitter' className='fas fa-check' />
                                <ListItemComponent text='Partez à votre rendez-vous sans vous soucier de la promenade de votre chien' className='fas fa-check' />
                                <ListItemComponent text='Besoin de flexibilité? Choisissez les horaires et périodes qui vous conviennent' className='fas fa-check' />
                            </div>
                            <div className='col-lg-4 mx-auto border border-danger rounded serviceProposes'>

                                <ListItemComponent text='Tous les nouveaux gardiens passent une vérification des antécédents de base' className='fas fa-check' />
                                <ListItemComponent text='Tous les gardiens fournissent un profil détaillé et des informations personnelles ' className='fas fa-check' />
                                <ListItemComponent text='Tous les Pet Sitter sont agréés par notre équipe de spécialistes chez Pets Friendly' className='fas fa-check' />
                            </div>
                        </div>
                    </div>
                    <div className='infolettreDiv mt-3'>
                        <h1 className='h1'>Laissez nous vous prévenir de nos nouveautés</h1>
                        <h6 className='h6'>Restez informé</h6>
                        <form>
                            <InputComponent classCss='form-group' classInput='form-control' textLabel='Entrez votre email' type='email' id='infolettre' name='infolettre' onChange={this.handleChange} />
                            <InputComponent classInput='btn btn-outline-danger' type='submit' id='infolettreButton' name='Envoyer ' value='Envoyer' />
                        </form>
                    </div>
                </div>
                <ModalMessage onHandleonCloseModal={this.onHandleonCloseModal} show={this.state.showmodal}>{this.state.message}</ModalMessage>
            </div>
        )
    }
}

export default withRouter(RecherchePetsitter)
