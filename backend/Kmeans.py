#!/usr/bin/env python
# coding: utf-8


import cv2
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
import math

def get_extension(filename):
    return os.path.splitext(filename)[-1]

def decode_image(byte_array):
    decoded = cv2.imdecode(np.frombuffer(byte_array, np.uint8), -1)
    return decoded

def resize(filename, byte_array):
    image = decode_image(byte_array)
    height, width, _ = image.shape
    resize_ratio = 480./height
    image = image.astype(float)
    image = cv2.resize(image, None, fx=resize_ratio, fy=resize_ratio)
    extension = get_extension(filename)
    _, buffer = cv2.imencode(extension, image)
    return buffer

def compress_image(filename, byte_array):
    image = decode_image(byte_array)
    height, width, _ = image.shape
    if height > 480:
        resize_ratio = 480./height
        image = cv2.resize(image, None, fx=resize_ratio, fy=resize_ratio)
    image = image.astype(float) # convert from unsigned int to float to make distance calculations correct
    compressed = k_means_driver(image, 8)
    extension = get_extension(filename)
    _, buffer = cv2.imencode(extension, compressed)
    cv2.imwrite(filename, compressed)
    return buffer


def get_distance(p1, p2): # takes 2 rgb values and finds the l2 norm of their difference
    return np.linalg.norm(p2-p1)

def initialize_means(img, k):
    '''
    Initializes the means of the clusters using the furthest-first heuristic
    @param img: the original image
    @param k: the number of clusters
    Returns:
        mu: the initialized means of the clusters
    '''
    height, width, _ = img.shape # get the height and width of the image
    mu = [0] * k
    mu[0] = img[0][0] # initialize the first mean to be the first pixel of the image
    
    max_distance = 0

    for i in range(height): # get the second mean
        for j in range(width):
            current_distance = get_distance(mu[0], img[i][j])
            if current_distance > max_distance:
                max_distance = current_distance
                mu[1] = img[i][j]              

    for current in range(2, k): # get the rest of the means
        max_distance = 0
        for i in range(height): # for each point
            for j in range(width):
                min_dist_to_previous_means = math.inf
                for previous in range(current): # get the smallest distance to the previous means
                    current_distance = get_distance(mu[previous], img[i][j])
                    min_dist_to_previous_means = min(min_dist_to_previous_means, current_distance)
                    
                if min_dist_to_previous_means > max_distance: # find the point that maximizes that smallest distance
                    max_distance = min_dist_to_previous_means
                    mu[current] = img[i][j]
    return mu

def k_means(mu, img, n_iterations=10):
    '''
    @param mu: initialized means
    @param img: the original image to segment on
    Returns:
        clusters: the rgb pixel values assigned to each cluster
        points: the x, y coordinate of the points assigned to each cluster in the image
        errors: the error while training, computed after every iteration
        mu: the final means after training
    '''
    errors = [] # list of the errors
    mu = list(mu)
    height, width, _ = img.shape
    for it in range(n_iterations):
        classifications = [[] for i in range(len(mu))]
        points = [[] for i in range(len(mu))]
        for i in range(height):
            for j in range(width):
                pixel = img[i][j]
                min_dist = math.inf
                cluster = 0
                for cluster_index, mean in enumerate(mu): # assign the points to a cluster
                    current_distance = get_distance(mean, pixel)
                    if current_distance < min_dist:
                        min_dist = current_distance
                        cluster =  cluster_index
                classifications[cluster].append(pixel)
                points[cluster].append((i, j))
        for i in range(len(classifications)):
            mu[i] = np.average(classifications[i], axis=0) # update the means
            
        total_error = 0
        for i in range(len(classifications)):
            mean = mu[i]
            for point in classifications[i]:
                total_error += get_distance(mean, point)**2 # calculate the error based on the objective function
        errors.append(total_error)
    return classifications, points, errors, mu
                
def compress(points, mu, img):
    '''
    Compresses the image based on the means and the clusters
    @param points: the (x, y) coordinate of the points in each cluster
    @param mu: the rgb values of the cluster means
    @param img: the original image
    '''
    for index, classes in enumerate(points): # set the rgb value of each pixel to its corresponding cluster value
        for point in classes:
            x, y = point
            img[x][y] = mu[index]
    img = img.astype(np.uint8) # convert the image back to unsigned ints
    return img

def k_means_driver(img, k): # run the k-means algorithm
    mu = initialize_means(img, k)
    print(mu)
    clusters, points, errors, mu = k_means(mu, img)
    print(mu)
    compressed = img.copy()
    compressed = compress(points, mu, compressed)
    return compressed
