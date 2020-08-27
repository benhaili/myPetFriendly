import React, { Component } from 'react'

import axios from 'axios'
import { Button } from 'react-bootstrap'

class UpdateProfile extends Component {
    constructor () {
        super()
        this.state = {
            id: '',
            id_role: '',
            id_adress: '',
            nom: '',
            mot_de_passe: '',
            urlImg: '',
            prenom: '',
            age: '',
            email: '',
            sexe: '',
            telephone: '',
            numero_rue: '',
            nom_rue: '',
            code_postal: '',
            ville: '',
            province: '',
            pays: '',
            numero_appt: '',

            user: [],
            address: [],

            est_valide: false,
            selectedFile: '',
            errors: {}
        }
        this.onTodoChange = this.onTodoChange.bind(this)
        this.submitModifier = this.submitModifier.bind(this)
        this.fileSelected = this.fileSelected.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    componentDidMount () {
        // const token = localStorage.usertoken
        // const decoded = jwtdecode(token)
        if (localStorage.getItem('usertoken')) {
            this.setState({
                user: JSON.parse(localStorage.getItem('usertoken')).utilisateur,
                address: JSON.parse(localStorage.getItem('usertoken')).adresse,
                id: JSON.parse(localStorage.getItem('usertoken')).utilisateur.id,
                mot_de_passe: JSON.parse(localStorage.getItem('usertoken')).utilisateur.mot_de_passe,
                id_adress: JSON.parse(localStorage.getItem('usertoken')).adresse.id,
                numero_rue: JSON.parse(localStorage.getItem('usertoken')).adresse.numero_rue,
                nom_rue: JSON.parse(localStorage.getItem('usertoken')).adresse.nom_rue,
                id_role: JSON.parse(localStorage.getItem('usertoken')).utilisateur.id_role,
                code_postal: JSON.parse(localStorage.getItem('usertoken')).adresse.code_postal,
                ville: JSON.parse(localStorage.getItem('usertoken')).adresse.ville,
                province: JSON.parse(localStorage.getItem('usertoken')).adresse.province,
                pays: JSON.parse(localStorage.getItem('usertoken')).adresse.pays,
                numero_appt: JSON.parse(localStorage.getItem('usertoken')).adresse.numero_appt,
                nom: JSON.parse(localStorage.getItem('usertoken')).utilisateur.nom,
                prenom: JSON.parse(localStorage.getItem('usertoken')).utilisateur.prenom,
                age: JSON.parse(localStorage.getItem('usertoken')).utilisateur.age,
                sexe: JSON.parse(localStorage.getItem('usertoken')).utilisateur.sexe,
                telephone: JSON.parse(localStorage.getItem('usertoken')).utilisateur.telephone,
                est_valide: JSON.parse(localStorage.getItem('usertoken')).utilisateur.est_valide,
                email: JSON.parse(localStorage.getItem('usertoken')).utilisateur.email,
                urlImg: 'http://pets-friendly.herokuapp.com/images/images_profiles/' + JSON.parse(localStorage.getItem('usertoken')).utilisateur.url_photo
            })
        } else {
            this.props.history.push('/')
        }
    }

    fileSelected (e) {
        this.setState({
            selectedFile: e.target.files[0]
        })
        console.log(e.target.files[0])
    }

    submitModifier () {
        axios
            .put('https://pets-friendly.herokuapp.com/utilisateurs/configuration', {
                utilisateur: {
                    id: this.state.id,
                    id_role: this.state.id_role,
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    age: this.state.age,
                    email: this.state.email,
                    mot_de_passe: this.state.mot_de_passe,
                    // mot_de_passe: this.state.mot_de_passe,
                    sexe: this.state.sexe,
                    telephone: this.state.telephone
                },
                adresse: {
                    id: this.state.id_adress,
                    numero_rue: this.state.numero_rue,
                    nom_rue: this.state.nom_rue,
                    code_postal: this.state.code_postal,
                    ville: this.state.ville,
                    province: this.state.province,
                    pays: this.state.pays,
                    numero_appt: this.state.numero_appt
                }

            })
            .then(response => {
                console.log('Bien Modifier', response)
            })
    }

    onTodoChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    fileUpload (e) {
        const image = this.state.selectedFile
        e.preventDefault()
        const data = new FormData()
        data.append('file', image)
        console.log('filename', image)
        console.log('data', data)
        const id = JSON.parse(localStorage.getItem('usertoken')).utilisateur.id

        axios
            .post(`https://pets-friendly.herokuapp.com/photos/profile/ajout/utilisateur/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            })
            .then(response => {
                // localStorage.setItem('usertoken', JSON.stringify(response.data))
                console.log(response.data)
                this.setState({
                    imgUrl: response.data
                })
                console.log(localStorage.getItem('usertoken'))

                return response.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    render () {
        console.log('state', this.state.urlImg)
        return (

            <div className='container'>
                {/* je veux pusher cette page */}
                <form method='post' encType='multipart/form-data'>
                    <div className='form-group'>
                        <label htmlFor='exampleFormControlFile1'>Mettre une photo de profil</label>
                        <input name='image' type='file' className='form-control-file' id='exampleFormControlFile1' onChange={this.fileSelected} />
                        <Button onClick={this.fileUpload}>Upload</Button>
                    </div>
                </form>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Ton Nom</label>
                        <input type='text' className='form-control validate' name='nom' value={this.state.nom} onChange={this.onTodoChange} />

                    </div>
                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Ton Prenom</label>
                        <input type='text' className='form-control validate' name='prenom' value={this.state.prenom} onChange={this.onTodoChange} />

                    </div>
                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Ton sexe</label>
                        <input type='text' className='form-control validate' name='sexe' value={this.state.sexe} onChange={this.onTodoChange} />

                    </div>
                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Ton numero de telephone </label>
                        <input type='tel' className='form-control validate' name='telephone' value={this.state.telephone} onChange={this.onTodoChange} />

                    </div>
                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Ton Email</label>
                        <input type='email' className='form-control validate' name='email' value={this.state.email} onChange={this.onTodoChange} />

                    </div>
                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <input type='number' className='form-control validate' name='numero_rue' value={this.state.numero_rue} onChange={this.onTodoChange} />
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Numero de rue</label>

                    </div>

                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Nom de rue</label>
                        <input type='text' className='form-control validate' name='nom_rue' value={this.state.nom_rue} onChange={this.onTodoChange} />

                    </div>

                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Code Postal</label>
                        <input type='text' className='form-control validate' name='code_postal' value={this.state.code_postal} onChange={this.onTodoChange} />

                    </div>

                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Ville</label>

                        <input type='text' className='form-control validate' name='ville' value={this.state.ville} onChange={this.onTodoChange} />

                    </div>

                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Province</label>

                        <input type='text' className='form-control validate' name='province' value={this.state.province} onChange={this.onTodoChange} />

                    </div>

                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Pays</label>

                        <input type='text' className='form-control validate' name='pays' value={this.state.pays} onChange={this.onTodoChange} />

                    </div>

                </div>
                <div className='modal-body mx-3'>

                    <div className='md-form mb-5'>
                        <label data-error='wrong' data-success='right' htmlFor='defaultForm-email'>Numero appartement</label>

                        <input type='number' className='form-control validate' name='numero_appt' value={this.state.numero_appt} onChange={this.onTodoChange} />

                    </div>

                </div>

                <Button variant='btn btn-primary btn-lg mx-auto ' onClick={this.submitModifier}>Update </Button>
                <Button variant='btn btn-primary btn-lg' onClick={this.fileUpload}>Annuler </Button>
            </div>

        )
    }
}

export default UpdateProfile
