The key identity is the following:

$$
\Sigma Q = Q \wedge
$$

- $\Sigma$ is a matrix, here, in particular, the covariance matrix
- $\wedge$ is the diagonal matrix with constants

$$
\begin{aligned}
\Sigma &=
\begin{bmatrix}
\sigma_{11} & \sigma_{12} & \cdots & \sigma_{1n}\\
\sigma_{21} & \sigma_{22} & \cdots & \sigma_{2n}\\
\vdots      & \vdots      & \ddots & \vdots\\
\sigma_{n1} & \sigma_{n2} & \cdots & \sigma_{nn}
\end{bmatrix}\\
\wedge &=
\begin{bmatrix}
\lambda_1 &        &        & 0\\
           & \lambda_2 &     &  \\
           &        & \ddots &  \\
0          &        &        & \lambda_n
\end{bmatrix}
\end{aligned}
$$

In generality, this is the eigenvalue problem for multiple eigenvectors and eigenvalues.

After multiplication on the right hand side, the matrix $(Q \wedge)$ will contain the columns vectors of $Q$ each multiplied by one of the constants of $\wedge$.

$$
\begin{aligned}

Q &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\vec{q_1} & \vec{q_2} & \cdots & \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}\\

Q \wedge &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\lambda_1 \vec{q_1} & \lambda_2 \vec{q_2} & \cdots & \lambda_n \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
\end{aligned}
$$

And on the left hand side after multiplication, the resulting column vectors of matrix $(\Sigma Q)$ can each be viewed as column vectors of $Q$, each multiplied by $\Sigma$.

$$
\Sigma Q =
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\Sigma \vec{q_1} & \Sigma \vec{q_2} & \cdots & \Sigma \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
$$

Therefore, for $\forall \vec{q_i} \in Q$ and their corresponding constant $ \wedge_{i,i} \in \wedge $ the following must hold:

$$
\Sigma \vec{q_i} = \vec{q_i} \wedge_{i,i}
$$

Which is the eigenvalue problem for one eigenvector.
From the above identity we can draw an important conclusion, when $Q$ is invertible.

$$
\begin{aligned}
\Sigma Q &= Q \wedge\\
\implies Q^{-1}\Sigma Q &= Q^{-1}Q \wedge = \wedge
\end{aligned}
$$

$\Sigma$ is a special matrix, because covariance matrices are symmetrical and hence they have exactly $n$ eigenvectors which are orthogonal. And the inverse of square matrices holding orthogonal vectors exist, and it is exactly their transpose:

$$
Q^{-1}=Q^T
$$

The reasoning is trivial. Nondiagonal entries of $(QQ^T)$ are products of different eigenvectors, which are orthogonal, and hence their dot product is zero. While at the diagonal we have the square of the Euclidean $(L_2)$ length/norm of the eigenvector (which is $1$ if they are chosen to be unit vectors):

$$
QQ^T =
\begin{bmatrix}
q_1^Tq_1 & q_1^Tq_2 & \cdots & q_1^Tq_n \\
q_2^Tq_1 & q_2^Tq_2 & \cdots & q_2^Tq_n \\
\vdots   & \vdots   & \ddots & \vdots   \\
q_n^Tq_1 & q_n^Tq_2 & \cdots & q_n^Tq_n
\end{bmatrix}\\

(QQ^T)_{ij} = q_i^Tq_j =
\begin{cases}
0, & i \ne j
\quad\\[4pt]
\lVert q_i\rVert_2^2, & i=j
\quad
\end{cases}\\
QQ^T =
\begin{bmatrix}
\underbrace{q_1^Tq_1}_{\lVert q_1\rVert_2^2=1}
&
\underbrace{q_1^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_1^Tq_n}_{=0}
\\
\underbrace{q_2^Tq_1}_{=0}
&
\underbrace{q_2^Tq_2}_{\lVert q_2\rVert_2^2=1}
&
\cdots
&
\underbrace{q_2^Tq_n}_{=0}
\\
\vdots & \vdots & \ddots & \vdots
\\
\underbrace{q_n^Tq_1}_{=0}
&
\underbrace{q_n^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_n^Tq_n}_{\lVert q_n\rVert_2^2=1}
\end{bmatrix}
$$

The important conclusion here is, however:

$$
\begin{aligned}
\Sigma Q &= Q \wedge\\
\implies Q^{-1}\Sigma Q &= Q^{T}\Sigma Q = \wedge
\end{aligned}
$$

This result is important because the $z$-score transformation by matrix $Q$ yields:

$$
\begin{aligned}
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]\\
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
\left(Q^Tz^T-Q^T\mathbb{E}[z]^T\right)
\left(zQ-\mathbb{E}[z]Q\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
Q^T
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
Q
\right]
\\[4pt]
&=
Q^T
\mathbb{E}\left[
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
\right]
Q
\\[4pt]
&=
Q^T\operatorname{Cov}(z)Q\\
&= Q^T \Sigma Q = \wedge
\end{aligned}
$$

Therefore, the transformed data has diagonal covariance matrix, hence the new features, formed by linear combinations of the original features are **uncorrelated**.